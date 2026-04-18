import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const EDIT_PASSWORD = process.env.PPT_EDIT_PASSWORD || "purplehub2024";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ppt_config?id=eq.main&select=url`,
      { headers, cache: "no-store" }
    );
    const data = await res.json();
    return NextResponse.json({ url: data[0]?.url || "" });
  } catch {
    return NextResponse.json({ url: "" });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password, url } = body;

  if (password !== EDIT_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await fetch(`${SUPABASE_URL}/rest/v1/ppt_config?id=eq.main`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({ url }),
  });

  return NextResponse.json({ success: true, url });
}
