import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

// GET: Check if user is authenticated
export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("ppt_auth_token");
  
  if (!authToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}

// POST: Verify credentials and set auth cookie
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password, action } = body;

  // If action is "update", verify admin password and update credentials
  if (action === "update") {
    const { currentPassword, newUsername, newPassword } = body;
    
    // Verify current admin password (using edit password as admin password)
    const EDIT_PASSWORD = process.env.PPT_EDIT_PASSWORD || "Purplehub@123";
    if (currentPassword !== EDIT_PASSWORD) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }

    // Update credentials in database
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/ppt_config?id=eq.main`, {
        method: "PATCH",
        headers: { ...headers, Prefer: "return=minimal" },
        body: JSON.stringify({ 
          access_username: newUsername,
          access_password: newPassword 
        }),
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
    }
  }

  // Regular login: verify credentials
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ppt_config?id=eq.main&select=access_username,access_password`,
      { headers, cache: "no-store" }
    );
    const data = await res.json();
    const storedUsername = data[0]?.access_username || "purplehub";
    const storedPassword = data[0]?.access_password || "Purple@2026";

    if (username === storedUsername && password === storedPassword) {
      // Create auth token (simple approach - in production use JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");
      
      const response = NextResponse.json({ success: true });
      response.cookies.set("ppt_auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/ppt",
      });

      return response;
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

// DELETE: Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("ppt_auth_token");
  return response;
}
