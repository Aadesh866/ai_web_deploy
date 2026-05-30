"use client";

import { useState, useEffect } from "react";
import VideoLoginScreen from "./VideoLoginScreen";
import VideoClient from "./VideoClient";
import VideoAdminModal from "./VideoAdminModal";
import { motion } from "framer-motion";
import { Settings, LogOut } from "lucide-react";

export default function VideoPageWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [initialVideoUrl, setInitialVideoUrl] = useState("");

  useEffect(() => {
    // Check if user already has valid auth cookie
    fetch("/api/video-auth")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
          // Load video URL from server
          return fetch("/api/video-config");
        }
        throw new Error("Not authenticated");
      })
      .then((res) => {
        if (!res) return null;
        return res.json();
      })
      .then((data) => {
        if (data?.url) {
          console.log("Loaded video URL:", data.url);
          setInitialVideoUrl(data.url);
        } else {
          console.log("No video URL found in database");
        }
      })
      .catch((err) => {
        console.error("Error loading video:", err);
        // Not authenticated or failed to load video
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, []);

  // Reload video URL when authentication changes
  useEffect(() => {
    if (isAuthenticated && !isChecking) {
      console.log("Authentication changed - reloading video URL");
      fetch("/api/video-config")
        .then((res) => res.json())
        .then((data) => {
          if (data?.url) {
            console.log("Reloaded video URL after auth change:", data.url);
            setInitialVideoUrl(data.url);
          } else {
            console.log("No video URL found after auth change");
            setInitialVideoUrl("");
          }
        })
        .catch((err) => {
          console.error("Error reloading video after auth change:", err);
        });
    }
  }, [isAuthenticated, isChecking]);

  const handleLogout = async () => {
    await fetch("/api/video-auth", { method: "DELETE" });
    window.location.reload();
  };

  if (isChecking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0B0F19 0%, #111827 50%, #0a1628 100%)",
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
    return <VideoLoginScreen onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <VideoClient initialVideoUrl={initialVideoUrl} />
  );
}
