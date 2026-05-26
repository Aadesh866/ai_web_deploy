import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

// GET: Fetch current credentials
export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ppt_config?id=eq.main&select=access_username,access_password`,
      { headers, cache: "no-store" }
    );
    const data = await res.json();
    
    return NextResponse.json({
      username: data[0]?.access_username || "purplehub",
      password: data[0]?.access_password || "Purple@2026",
    });
  } catch (error) {
    return NextResponse.json(
      { username: "purplehub", password: "Purple@2026" },
      { status: 200 }
    );
  }
}
