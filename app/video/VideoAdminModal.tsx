"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  Settings,
  Upload,
  LinkIcon,
  FileIcon,
  Video,
} from "lucide-react";

interface VideoAdminModalProps {
  show: boolean;
  onClose: () => void;
  onVideoChange: (file: File | null, url: string) => void;
}

export default function VideoAdminModal({ show, onClose, onVideoChange }: VideoAdminModalProps) {
  // Admin password state
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"video" | "credentials">("video");

  // Video upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState("");
  const [videoSuccess, setVideoSuccess] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);

  // Change credentials state
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [credError, setCredError] = useState("");
  const [credSuccess, setCredSuccess] = useState(false);
  const [updatingCreds, setUpdatingCreds] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loadingCreds, setLoadingCreds] = useState(false);

  // Close and reset
  const handleClose = useCallback(() => {
    setAdminUnlocked(false);
    setAdminPassword("");
    setShowAdminPassword(false);
    setAdminPasswordError("");
    setActiveTab("video");
    setUploadFile(null);
    setVideoUrl("");
    setVideoError("");
    setVideoSuccess(false);
    setVideoUploading(false);
    setNewUsername("");
    setNewPassword("");
    setShowNewPassword(false);
    setCredError("");
    setCredSuccess(false);
    onClose();
  }, [onClose]);

  // Admin password verification
  const handleAdminPasswordSubmit = useCallback(async () => {
    setAdminPasswordError("");
    // Verify admin password by trying to update with same credentials
    const res = await fetch("/api/video-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        action: "update",
        currentPassword: adminPassword,
        newUsername: "videohub", // dummy
        newPassword: "Video@2026" // dummy
      }),
    });
    if (res.ok) {
      setAdminUnlocked(true);
      fetchCurrentCredentials();
    } else {
      setAdminPasswordError("Incorrect admin password. Please try again.");
    }
  }, [adminPassword]);

  // Fetch current credentials
  const fetchCurrentCredentials = useCallback(async () => {
    setLoadingCreds(true);
    try {
      const res = await fetch("/api/video-auth/current");
      if (res.ok) {
        const data = await res.json();
        setCurrentUsername(data.username || "");
        setCurrentPassword(data.password || "");
      }
    } catch {
      // Silently fail
    } finally {
      setLoadingCreds(false);
    }
  }, []);

  // Handle video change
  const handleVideoChange = useCallback(async () => {
    if (!uploadFile && !videoUrl.trim()) {
      setVideoError("Please select a file or enter a URL");
      return;
    }
    
    setVideoSuccess(false);
    setVideoError("");
    setVideoUploading(true);

    try {
      let finalUrl = videoUrl.trim();

      // If file is selected, upload it via API
      if (uploadFile) {
        console.log("Uploading file:", uploadFile.name);
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("password", adminPassword);

        const uploadRes = await fetch("/api/video-upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          console.error("Upload failed:", uploadData.error);
          setVideoError(uploadData.error || "Upload failed");
          return;
        }

        finalUrl = uploadData.url;
        console.log("File uploaded successfully:", finalUrl);
      } else {
        // Just URL, save it directly
        console.log("Saving video URL:", finalUrl);
        const res = await fetch("/api/video-config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: adminPassword, url: finalUrl }),
        });

        if (!res.ok) {
          console.error("Failed to save video URL");
          setVideoError("Failed to save video URL");
          return;
        }
        console.log("Video URL saved successfully");
      }

      console.log("Calling onVideoChange with URL:", finalUrl);
      onVideoChange(null, finalUrl);
      setVideoSuccess(true);
      setTimeout(() => {
        setVideoSuccess(false);
        setUploadFile(null);
        setVideoUrl("");
      }, 1500);
    } catch (error) {
      console.error("Video change error:", error);
      setVideoError("Failed to save. Please try again.");
    } finally {
      setVideoUploading(false);
    }
  }, [uploadFile, videoUrl, adminPassword, onVideoChange]);

  // Update credentials
  const handleUpdateCredentials = useCallback(async () => {
    if (!newUsername.trim() || !newPassword.trim()) {
      setCredError("Please enter both username and password");
      return;
    }
    setUpdatingCreds(true);
    setCredError("");

    try {
      const res = await fetch("/api/video-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          currentPassword: adminPassword,
          newUsername: newUsername.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      if (res.ok) {
        setCredSuccess(true);
        setTimeout(() => {
          setCredSuccess(false);
          setNewUsername("");
          setNewPassword("");
          setCredError("");
          fetchCurrentCredentials();
        }, 2000);
      } else {
        setCredError("Invalid admin password or update failed");
      }
    } catch {
      setCredError("Network error. Please try again.");
    } finally {
      setUpdatingCreds(false);
    }
  }, [adminPassword, newUsername, newPassword, fetchCurrentCredentials]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,10,20,0.75)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{
            background: "linear-gradient(135deg, #1E293B, #162032)",
            border: "1px solid rgba(51,65,85,0.8)",
            borderRadius: 20,
            padding: "32px 36px",
            width: "100%",
            maxWidth: 520,
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.05)",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(51,65,85,0.5)",
              border: "none",
              borderRadius: 8,
              color: "#94A3B8",
              cursor: "pointer",
              padding: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(59,130,246,0.2))",
                border: "1px solid rgba(34,197,94,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Lock size={20} color="#22C55E" />
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#F1F5F9",
                margin: 0,
                fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
                letterSpacing: "-0.02em",
              }}
            >
              {adminUnlocked ? "Video Admin Panel" : "Admin Authentication"}
            </h3>
            <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 6 }}>
              {adminUnlocked
                ? "Manage video page access credentials"
                : "Enter admin password to access settings"}
            </p>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {!adminUnlocked ? (
              /* Password Step */
              <motion.div
                key="password"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "#94A3B8",
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  Admin Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showAdminPassword ? "text" : "password"}
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setAdminPasswordError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAdminPasswordSubmit();
                    }}
                    placeholder="Enter admin password..."
                    autoFocus
                    style={{
                      width: "100%",
                      padding: "12px 44px 12px 16px",
                      background: "rgba(15,23,42,0.7)",
                      border: `1px solid ${
                        adminPasswordError
                          ? "rgba(239,68,68,0.5)"
                          : "rgba(51,65,85,0.8)"
                      }`,
                      borderRadius: 10,
                      color: "#F1F5F9",
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#64748B",
                      cursor: "pointer",
                      padding: 4,
                      display: "flex",
                    }}
                  >
                    {showAdminPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {adminPasswordError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 8,
                      color: "#F87171",
                      fontSize: 13,
                    }}
                  >
                    <AlertCircle size={14} />
                    {adminPasswordError}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdminPasswordSubmit}
                  style={{
                    marginTop: 18,
                    width: "100%",
                    padding: "12px",
                    borderRadius: 10,
                    border: "none",
                    background: "linear-gradient(135deg, #22C55E, #16A34A)",
                    color: "white",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 0 20px rgba(34,197,94,0.25)",
                  }}
                >
                  Unlock Admin Panel
                </motion.button>
              </motion.div>
            ) : (
              /* Admin Panel with Tabs */
              <motion.div
                key="panel"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {/* Tabs */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 24,
                    borderBottom: "1px solid rgba(51,65,85,0.5)",
                    paddingBottom: 2,
                  }}
                >
                  <button
                    onClick={() => setActiveTab("video")}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      background:
                        activeTab === "video"
                          ? "rgba(34,197,94,0.1)"
                          : "transparent",
                      border: "none",
                      borderBottom:
                        activeTab === "video"
                          ? "2px solid #22C55E"
                          : "2px solid transparent",
                      color: activeTab === "video" ? "#22C55E" : "#94A3B8",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      borderRadius: "6px 6px 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Video size={14} />
                    Change Video
                  </button>
                  <button
                    onClick={() => setActiveTab("credentials")}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      background:
                        activeTab === "credentials"
                          ? "rgba(59,130,246,0.1)"
                          : "transparent",
                      border: "none",
                      borderBottom:
                        activeTab === "credentials"
                          ? "2px solid #3B82F6"
                          : "2px solid transparent",
                      color: activeTab === "credentials" ? "#3B82F6" : "#94A3B8",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      borderRadius: "6px 6px 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Lock size={14} />
                    Access Credentials
                  </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === "video" ? (
                    /* Video Upload Tab */
                    <motion.div
                      key="video-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div
                        style={{
                          padding: "10px 14px",
                          borderRadius: 8,
                          background: "rgba(34,197,94,0.08)",
                          border: "1px solid rgba(34,197,94,0.15)",
                          marginBottom: 18,
                          fontSize: 12,
                          color: "#86EFAC",
                        }}
                      >
                        📹 Upload a video file or paste a direct video URL
                      </div>

                      {/* File Upload */}
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          color: "#94A3B8",
                          marginBottom: 8,
                          fontWeight: 500,
                        }}
                      >
                        Upload Video File
                      </label>
                      <div style={{ marginBottom: 20 }}>
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 16px",
                            background: uploadFile
                              ? "rgba(34,197,94,0.1)"
                              : "rgba(15,23,42,0.7)",
                            border: `1px dashed ${
                              uploadFile
                                ? "rgba(34,197,94,0.5)"
                                : "rgba(51,65,85,0.8)"
                            }`,
                            borderRadius: 10,
                            cursor: "pointer",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <FileIcon
                              size={20}
                              color={uploadFile ? "#22C55E" : "#64748B"}
                            />
                            <span
                              style={{
                                color: uploadFile ? "#F1F5F9" : "#94A3B8",
                                fontSize: 14,
                              }}
                            >
                              {uploadFile ? uploadFile.name : "Choose video file (MP4, WebM, MOV)"}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setUploadFile(e.target.files[0]);
                                setVideoUrl("");
                                setVideoError("");
                              }
                            }}
                            style={{ display: "none" }}
                          />
                        </label>
                        {uploadFile && (
                          <button
                            onClick={() => setUploadFile(null)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#F87171",
                              fontSize: 12,
                              marginTop: 6,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <X size={12} /> Remove file
                          </button>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "16px 0",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: 1,
                            background: "rgba(51,65,85,0.5)",
                          }}
                        ></div>
                        <span style={{ color: "#64748B", fontSize: 13 }}>OR</span>
                        <div
                          style={{
                            flex: 1,
                            height: 1,
                            background: "rgba(51,65,85,0.5)",
                          }}
                        ></div>
                      </div>

                      {/* URL Input */}
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          color: "#94A3B8",
                          marginBottom: 8,
                          fontWeight: 500,
                        }}
                      >
                        Paste Video URL
                      </label>
                      <div style={{ position: "relative" }}>
                        <LinkIcon
                          size={15}
                          color="#64748B"
                          style={{
                            position: "absolute",
                            left: 14,
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        />
                        <input
                          type="url"
                          value={videoUrl}
                          onChange={(e) => {
                            setVideoUrl(e.target.value);
                            setUploadFile(null);
                            setVideoError("");
                          }}
                          placeholder="https://example.com/video.mp4"
                          style={{
                            width: "100%",
                            padding: "12px 16px 12px 40px",
                            background: "rgba(15,23,42,0.7)",
                            border: `1px solid ${
                              videoError
                                ? "rgba(239,68,68,0.5)"
                                : "rgba(51,65,85,0.8)"
                            }`,
                            borderRadius: 10,
                            color: "#F1F5F9",
                            fontSize: 14,
                            outline: "none",
                            boxSizing: "border-box",
                            fontFamily: "inherit",
                          }}
                        />
                      </div>

                      {videoError && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginTop: 8,
                            color: "#F87171",
                            fontSize: 13,
                          }}
                        >
                          <AlertCircle size={14} />
                          {videoError}
                        </motion.div>
                      )}

                      {videoUploading && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginTop: 18,
                            padding: "12px 16px",
                            borderRadius: 8,
                            background: "rgba(59,130,246,0.1)",
                            border: "1px solid rgba(59,130,246,0.3)",
                            color: "#93C5FD",
                            fontSize: 14,
                          }}
                        >
                          <Loader2
                            size={16}
                            style={{ animation: "spin 1s linear infinite" }}
                          />
                          {uploadFile ? "Uploading video..." : "Processing..."}
                        </motion.div>
                      )}

                      <motion.button
                        whileHover={{ scale: videoSuccess ? 1 : 1.02 }}
                        whileTap={{ scale: videoSuccess ? 1 : 0.97 }}
                        onClick={handleVideoChange}
                        disabled={videoSuccess || videoUploading}
                        style={{
                          marginTop: videoUploading ? 12 : 18,
                          width: "100%",
                          padding: "12px",
                          borderRadius: 10,
                          border: "none",
                          background: videoSuccess
                            ? "linear-gradient(135deg, #16A34A, #15803D)"
                            : "linear-gradient(135deg, #22C55E, #16A34A)",
                          color: "white",
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: videoSuccess || videoUploading ? "not-allowed" : "pointer",
                          boxShadow: "0 0 20px rgba(34,197,94,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          opacity: videoUploading ? 0.7 : 1,
                        }}
                      >
                        {videoSuccess ? (
                          <>
                            <CheckCircle size={16} /> Changed!
                          </>
                        ) : (
                          "Change Video"
                        )}
                      </motion.button>
                    </motion.div>
                  ) : (
                    /* Credentials Tab */
                    <motion.div
                      key="credentials-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: "rgba(59,130,246,0.08)",
                    border: "1px solid rgba(59,130,246,0.15)",
                    marginBottom: 18,
                    fontSize: 12,
                    color: "#93C5FD",
                  }}
                >
                  🔐 Update username and password for video page access
                </div>

                {/* Current Credentials Display */}
                {loadingCreds ? (
                  <div style={{ padding: "12px", textAlign: "center", color: "#94A3B8", fontSize: 13 }}>
                    Loading current credentials...
                  </div>
                ) : currentUsername && currentPassword ? (
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: 8,
                      background: "rgba(15,23,42,0.7)",
                      border: "1px solid rgba(51,65,85,0.8)",
                      marginBottom: 18,
                    }}
                  >
                    <div style={{ fontSize: 12, color: "#64748B", marginBottom: 8, fontWeight: 500 }}>
                      Current Credentials:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, color: "#94A3B8", minWidth: 70 }}>Username:</span>
                        <span style={{ fontSize: 13, color: "#F1F5F9", fontFamily: "monospace" }}>{currentUsername}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, color: "#94A3B8", minWidth: 70 }}>Password:</span>
                        <span style={{ fontSize: 13, color: "#F1F5F9", fontFamily: "monospace" }}>{currentPassword}</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      color: "#94A3B8",
                      marginBottom: 8,
                      fontWeight: 500,
                    }}
                  >
                    New Username
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => {
                      setNewUsername(e.target.value);
                      setCredError("");
                    }}
                    placeholder="Enter new username..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(15,23,42,0.7)",
                      border: "1px solid rgba(51,65,85,0.8)",
                      borderRadius: 10,
                      color: "#F1F5F9",
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      color: "#94A3B8",
                      marginBottom: 8,
                      fontWeight: 500,
                    }}
                  >
                    New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setCredError("");
                      }}
                      placeholder="Enter new password..."
                      style={{
                        width: "100%",
                        padding: "12px 44px 12px 16px",
                        background: "rgba(15,23,42,0.7)",
                        border: "1px solid rgba(51,65,85,0.8)",
                        borderRadius: 10,
                        color: "#F1F5F9",
                        fontSize: 15,
                        outline: "none",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((v) => !v)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "#64748B",
                        cursor: "pointer",
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {credError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 18,
                      color: "#F87171",
                      fontSize: 13,
                    }}
                  >
                    <AlertCircle size={14} />
                    {credError}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: credSuccess ? 1 : 1.02 }}
                  whileTap={{ scale: credSuccess ? 1 : 0.97 }}
                  onClick={handleUpdateCredentials}
                  disabled={updatingCreds || credSuccess}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 10,
                    border: "none",
                    background: credSuccess
                      ? "linear-gradient(135deg, #16A34A, #15803D)"
                      : "linear-gradient(135deg, #3B82F6, #2563EB)",
                    color: "white",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor:
                      updatingCreds || credSuccess ? "not-allowed" : "pointer",
                    boxShadow: "0 0 20px rgba(59,130,246,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {updatingCreds ? (
                    <>
                      <Loader2
                        size={16}
                        style={{ animation: "spin 1s linear infinite" }}
                      />{" "}
                      Updating...
                    </>
                  ) : credSuccess ? (
                    <>
                      <CheckCircle size={16} /> Updated!
                    </>
                  ) : (
                    "Update Credentials"
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
