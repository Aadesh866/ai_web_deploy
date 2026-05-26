"use client";

import { useState, useEffect } from "react";
import PPTLoginScreen from "./PPTLoginScreen";
import PPTPageClient from "./PPTPageClient";

interface PPTPageWrapperProps {
  initialUrl: string;
  supabaseUrl: string;
  supabaseKey: string;
}

export default function PPTPageWrapper({ initialUrl, supabaseUrl, supabaseKey }: PPTPageWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user already has valid auth cookie
    fetch("/api/ppt-auth")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        // Not authenticated
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, []);

  if (isChecking) {
    // Loading state
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0d1117 0%, #111827 50%, #0a1628 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "#94A3B8", fontSize: 15 }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PPTLoginScreen onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <PPTPageClient initialUrl={initialUrl} supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />;
}
