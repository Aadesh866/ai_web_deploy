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
    const data = await res.json();
    return NextResponse.json({ url: data[0]?.video_url || "" });
  } catch {
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
    await fetch(`${SUPABASE_URL}/rest/v1/video_config?id=eq.main`, {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ video_url: url }),
    });

    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}
