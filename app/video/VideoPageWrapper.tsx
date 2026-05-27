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
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // Check if user already has valid auth cookie
    fetch("/api/video-auth")
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

  const handleLogout = async () => {
    await fetch("/api/video-auth", { method: "DELETE" });
    window.location.reload();
  };

  const handleVideoChange = (file: File | null, url: string) => {
    setVideoFile(file);
    setVideoUrl(url);
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
    <div style={{ position: "relative" }}>
      {/* Admin & Logout Buttons - Fixed Position */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 50,
          display: "flex",
          gap: 12,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowAdminModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 18px",
            borderRadius: 10,
            border: "1px solid rgba(51,65,85,0.8)",
            background: "rgba(30,41,59,0.9)",
            backdropFilter: "blur(12px)",
            color: "#94A3B8",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <Settings size={15} />
          Admin
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 18px",
            borderRadius: 10,
            border: "1px solid rgba(239,68,68,0.3)",
            background: "rgba(127,29,29,0.5)",
            backdropFilter: "blur(12px)",
            color: "#F87171",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <LogOut size={15} />
        </motion.button>
      </div>

      <VideoClient videoFile={videoFile} videoUrl={videoUrl} />
      <VideoAdminModal 
        show={showAdminModal} 
        onClose={() => setShowAdminModal(false)}
        onVideoChange={handleVideoChange}
      />
    </div>
  );
}
