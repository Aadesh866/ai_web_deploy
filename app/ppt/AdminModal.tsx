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
  LinkIcon,
  FileIcon,
  Pencil,
  Settings,
} from "lucide-react";

interface AdminModalProps {
  show: boolean;
  onClose: () => void;
  pptUrl: string;
  onPptUrlUpdate: (url: string) => void;
  supabaseUrl: string;
  supabaseKey: string;
}

export default function AdminModal({
  show,
  onClose,
  pptUrl,
  onPptUrlUpdate,
  supabaseUrl,
  supabaseKey,
}: AdminModalProps) {
  // Admin password state
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "credentials">("edit");

  // Edit presentation state
  const [newUrl, setNewUrl] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Change credentials state
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [credError, setCredError] = useState("");
  const [credSuccess, setCredSuccess] = useState(false);
  const [updatingCreds, setUpdatingCreds] = useState(false);

  // Close and reset
  const handleClose = useCallback(() => {
    setAdminUnlocked(false);
    setAdminPassword("");
    setShowAdminPassword(false);
    setAdminPasswordError("");
    setActiveTab("edit");
    setNewUrl("");
    setUploadFile(null);
    setSaveError("");
    setSaveSuccess(false);
    setNewUsername("");
    setNewPassword("");
    setCredError("");
    setCredSuccess(false);
    onClose();
  }, [onClose]);

  // Admin password verification
  const handleAdminPasswordSubmit = useCallback(async () => {
    setAdminPasswordError("");
    const res = await fetch("/api/ppt-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: adminPassword, url: pptUrl }),
    });
    if (res.ok) {
      setAdminUnlocked(true);
      setNewUrl(pptUrl);
    } else {
      setAdminPasswordError("Incorrect admin password. Please try again.");
    }
  }, [adminPassword, pptUrl]);

  // Save presentation URL
  const handleSave = useCallback(async () => {
    if (!newUrl.trim() && !uploadFile) {
      setSaveError("Please enter a URL or select a file to upload.");
      return;
    }
    setSaving(true);
    setSaveError("");

    let finalUrl = newUrl.trim();

    try {
      if (uploadFile) {
        const fileExt = uploadFile.name.split(".").pop()?.toLowerCase() || "";
        const fileName = `presentation_${Date.now()}.${fileExt}`;

        const uploadRes = await fetch(
          `${supabaseUrl}/storage/v1/object/presentations/${fileName}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${supabaseKey}`,
              apikey: supabaseKey,
              "Content-Type": uploadFile.type || "application/octet-stream",
              "Cache-Control": "max-age=3600",
            },
            body: uploadFile,
          }
        );

        if (!uploadRes.ok) {
          throw new Error("File upload failed.");
        }

        finalUrl = `${supabaseUrl}/storage/v1/object/public/presentations/${fileName}`;
      }

      const res = await fetch("/api/ppt-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword, url: finalUrl }),
      });

      if (res.ok) {
        onPptUrlUpdate(finalUrl);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setNewUrl("");
          setUploadFile(null);
          setSaveError("");
        }, 1500);
      } else {
        setSaveError("Failed to save.");
      }
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [newUrl, adminPassword, uploadFile, supabaseUrl, supabaseKey, onPptUrlUpdate]);

  // Update credentials
  const handleUpdateCredentials = useCallback(async () => {
    if (!newUsername.trim() || !newPassword.trim()) {
      setCredError("Please enter both username and password");
      return;
    }
    setUpdatingCreds(true);
    setCredError("");

    try {
      const res = await fetch("/api/ppt-auth", {
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
        }, 2000);
      } else {
        setCredError("Invalid admin password or update failed");
      }
    } catch {
      setCredError("Network error. Please try again.");
    } finally {
      setUpdatingCreds(false);
    }
  }, [adminPassword, newUsername, newPassword]);

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
              {adminUnlocked ? "Admin Panel" : "Admin Authentication"}
            </h3>
            <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 6 }}>
              {adminUnlocked
                ? "Manage presentation and access credentials"
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
                    onClick={() => setActiveTab("edit")}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      background:
                        activeTab === "edit"
                          ? "rgba(34,197,94,0.1)"
                          : "transparent",
                      border: "none",
                      borderBottom:
                        activeTab === "edit"
                          ? "2px solid #22C55E"
                          : "2px solid transparent",
                      color: activeTab === "edit" ? "#22C55E" : "#94A3B8",
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
                    <Pencil size={14} />
                    Edit Presentation
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
                    <Settings size={14} />
                    Access Credentials
                  </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === "edit" ? (
                    /* Edit Tab - keeping it concise */
                    <motion.div
                      key="edit"
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
                        ✅ Supports: Canva, Google Slides, OneDrive, or Direct Upload
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
                        Upload File (.pps, .pptx, .pdf)
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
                              {uploadFile ? uploadFile.name : "Choose a file..."}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept=".pptx,.pps,.ppsx,.pdf"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setUploadFile(e.target.files[0]);
                                setNewUrl("");
                                setSaveError("");
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
                        Paste Presentation URL
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
                          value={newUrl}
                          onChange={(e) => {
                            setNewUrl(e.target.value);
                            setUploadFile(null);
                            setSaveError("");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                          }}
                          placeholder="https://www.canva.com/design/..."
                          style={{
                            width: "100%",
                            padding: "12px 16px 12px 40px",
                            background: "rgba(15,23,42,0.7)",
                            border: `1px solid ${
                              saveError
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

                      {saveError && (
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
                          {saveError}
                        </motion.div>
                      )}

                      <motion.button
                        whileHover={{ scale: saveSuccess ? 1 : 1.02 }}
                        whileTap={{ scale: saveSuccess ? 1 : 0.97 }}
                        onClick={handleSave}
                        disabled={saving || saveSuccess}
                        style={{
                          marginTop: 18,
                          width: "100%",
                          padding: "12px",
                          borderRadius: 10,
                          border: "none",
                          background: saveSuccess
                            ? "linear-gradient(135deg, #16A34A, #15803D)"
                            : "linear-gradient(135deg, #22C55E, #16A34A)",
                          color: "white",
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: saving || saveSuccess ? "not-allowed" : "pointer",
                          boxShadow: "0 0 20px rgba(34,197,94,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        }}
                      >
                        {saving ? (
                          <>
                            <Loader2
                              size={16}
                              style={{ animation: "spin 1s linear infinite" }}
                            />{" "}
                            Saving...
                          </>
                        ) : saveSuccess ? (
                          <>
                            <CheckCircle size={16} /> Saved!
                          </>
                        ) : (
                          "Save & Display"
                        )}
                      </motion.button>
                    </motion.div>
                  ) : (
                    /* Credentials Tab */
                    <motion.div
                      key="creds"
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
                        🔐 Update username and password for page access
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
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setCredError("");
                          }}
                          placeholder="Enter new password..."
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
