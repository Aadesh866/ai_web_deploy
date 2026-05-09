import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  try {
    // Check if env vars are set
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error("❌ Missing Supabase credentials");
      return NextResponse.json({ 
        success: false, 
        error: "Missing Supabase configuration" 
      }, { status: 500 });
    }

    console.log("🔄 Attempting Supabase keep-alive ping...");
    
    // Simple query to keep Supabase active
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ppt_config?id=eq.main&select=url`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        cache: "no-store",
      }
    );
    
    if (res.ok) {
      const timestamp = new Date().toISOString();
      console.log("✅ Supabase keep-alive ping successful at", timestamp);
      return NextResponse.json({ 
        success: true, 
        message: "Supabase is active",
        timestamp
      });
    } else {
      const errorText = await res.text();
      console.error("❌ Supabase keep-alive ping failed:", res.status, errorText);
      return NextResponse.json({ 
        success: false, 
        error: `Supabase returned ${res.status}`,
        details: errorText
      }, { status: 500 });
    }
  } catch (error) {
    console.error("❌ Keep-alive error:", error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
