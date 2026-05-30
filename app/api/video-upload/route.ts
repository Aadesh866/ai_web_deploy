import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const ADMIN_PASSWORD = process.env.VIDEO_ADMIN_PASSWORD || "VideoHub@123";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const password = formData.get("password") as string;

    // Verify admin password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
    const fileName = `video_${Date.now()}.${fileExt}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    const uploadRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/videos/${fileName}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "apikey": SUPABASE_KEY,
          "Content-Type": file.type || "video/mp4",
          "Cache-Control": "max-age=3600",
        },
        body: buffer,
      }
    );

    if (!uploadRes.ok) {
      const error = await uploadRes.text();
      console.error("Supabase upload error:", error);
      return NextResponse.json(
        { error: "Upload failed. Make sure 'videos' bucket exists in Supabase Storage." },
        { status: 500 }
      );
    }

    // Get public URL
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/videos/${fileName}`;

    // Save URL to database
    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/video_config?id=eq.main`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ video_url: publicUrl }),
    });

    if (!dbRes.ok) {
      const dbError = await dbRes.text();
      console.error("Database save error:", dbError);
      return NextResponse.json(
        { error: "Video uploaded but failed to save URL to database. Check RLS policies." },
        { status: 500 }
      );
    }

    console.log("Video URL saved to database:", publicUrl);
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
