import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    // Simple query to keep Supabase active
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ppt_config?id=eq.main&select=url`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    
    if (res.ok) {
      console.log("✅ Supabase keep-alive ping successful");
      return NextResponse.json({ 
        success: true, 
        message: "Supabase is active",
        timestamp: new Date().toISOString()
      });
    } else {
      console.error("❌ Supabase keep-alive ping failed");
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    console.error("❌ Keep-alive error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
