"use client";

import { useEffect } from "react";

export default function SupabaseKeepAlive() {
  useEffect(() => {
    const pingSupabase = async () => {
      try {
        // Check when we last pinged
        const lastPing = localStorage.getItem("supabase-last-ping");
        const now = Date.now();
        const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
        
        // Only ping if it's been more than 5 days (or never pinged)
        if (!lastPing || now - parseInt(lastPing) > fiveDaysInMs) {
          console.log("🔄 Sending Supabase keep-alive ping...");
          
          const response = await fetch("/api/cron/keep-alive");
          const data = await response.json();
          
          if (response.ok && data.success) {
            localStorage.setItem("supabase-last-ping", now.toString());
            console.log("✅ Supabase keep-alive successful:", data.timestamp);
          } else {
            console.error("❌ Supabase keep-alive failed:", data);
          }
        } else {
          const nextPing = new Date(parseInt(lastPing) + fiveDaysInMs);
          console.log("⏭️ Supabase keep-alive not needed. Next ping:", nextPing.toLocaleString());
        }
      } catch (error) {
        console.error("❌ Keep-alive error:", error);
      }
    };

    // Ping on mount (when someone visits)
    pingSupabase();
  }, []);

  return null;
}
