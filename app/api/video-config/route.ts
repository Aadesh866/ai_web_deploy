import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const ADMIN_PASSWORD = process.env.VIDEO_ADMIN_PASSWORD || "VideoHub@123";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

// GET: Fetch current video URL
export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/video_config?id=eq.main&select=video_url`,
      { headers, cache: "no-store" }
    );
    
    if (!res.ok) {
      const error = await res.text();
      console.error("Failed to fetch video config:", error);
      return NextResponse.json({ url: "" });
    }
    
    const data = await res.json();
    const videoUrl = data[0]?.video_url || "";
    console.log("GET /api/video-config - returning URL:", videoUrl);
    return NextResponse.json({ url: videoUrl });
  } catch (error) {
    console.error("GET /api/video-config error:", error);
    return NextResponse.json({ url: "" });
  }
}

// POST: Update video URL (admin only)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password, url } = body;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  try {
    const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/video_config?id=eq.main`, {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ video_url: url }),
    });

    if (!updateRes.ok) {
      const error = await updateRes.text();
      console.error("Failed to update video URL:", error);
      return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
    }

    console.log("POST /api/video-config - saved URL:", url);
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("POST /api/video-config error:", error);
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}
