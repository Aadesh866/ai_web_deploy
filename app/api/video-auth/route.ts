import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// In-memory session store (gets cleared frequently)
const activeSessions = new Set<string>();

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

// GET: Check if user is authenticated
export async function GET() {
  // Simple: clear all sessions on every GET request to force re-login
  activeSessions.clear();
  
  console.log("GET /api/video-auth - All sessions cleared, forcing re-login");
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

// POST: Verify credentials and set auth cookie
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password, action } = body;

  // If action is "update", verify admin password and update credentials
  if (action === "update") {
    const { currentPassword, newUsername, newPassword } = body;
    
    // Verify current admin password
    const ADMIN_PASSWORD = process.env.VIDEO_ADMIN_PASSWORD || "VideoHub@123";
    if (currentPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }

    // Update credentials in database
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/video_config?id=eq.main`, {
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
      `${SUPABASE_URL}/rest/v1/video_config?id=eq.main&select=access_username,access_password`,
      { headers, cache: "no-store" }
    );
    const data = await res.json();
    const storedUsername = data[0]?.access_username || "videohub";
    const storedPassword = data[0]?.access_password || "Video@2026";

    if (username === storedUsername && password === storedPassword) {
      // Create auth token and add to active sessions
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");
      activeSessions.add(token);
      
      console.log("POST /api/video-auth - Setting session for user:", username);
      console.log("POST /api/video-auth - Active sessions:", activeSessions.size);
      
      const response = NextResponse.json({ success: true });
      response.cookies.set("video_auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        // Session cookie - expires when tab closes or server restarts
        path: "/",
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
  const cookieStore = await cookies();
  const authToken = cookieStore.get("video_auth_token");
  
  if (authToken) {
    activeSessions.delete(authToken.value);
    console.log("DELETE /api/video-auth - Removed session, remaining:", activeSessions.size);
  }
  
  const response = NextResponse.json({ success: true });
  response.cookies.delete("video_auth_token");
  return response;
}
