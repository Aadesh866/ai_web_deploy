"use client";
// Hides global Navbar/Footer for this standalone page

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  Pencil,
  X,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  Minimize2,
  LinkIcon,
  Presentation,
} from "lucide-react";

// ─── URL normalizer ────────────────────────────────────────────────────────────
function buildEmbedUrl(url: string): string {
  if (!url) return "";

  // Canva embed — already an iframe src
  if (url.includes("canva.com/embed") || url.includes("canva.com/design")) {
    // Ensure it ends with ?embed
    if (!url.includes("embed")) return url + "?embed";
    return url;
  }

  // Google Slides — convert share link to embed
  if (url.includes("docs.google.com/presentation")) {
    return url
      .replace("/edit", "/embed")
      .replace("/pub", "/embed")
      .replace(/\/embed\?.*/, "/embed?start=false&loop=false&delayms=3000");
  }

  // Microsoft Office Online viewer for .pptx links (Google Drive, OneDrive, Dropbox, etc.)
  if (
    url.includes(".pptx") ||
    url.includes("1drv.ms") ||
    url.includes("sharepoint.com") ||
    url.includes("onedrive.live.com")
  ) {
    const encoded = encodeURIComponent(url);
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encoded}`;
  }

  // Assume raw embed-ready URL (already works in iframe)
  return url;
}

// ─── Props ─────────────────────────────────────────────────────────────────────
interface PPTPageClientProps {
  initialUrl: string;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function PPTPageClient({ initialUrl }: PPTPageClientProps) {
  const [pptUrl, setPptUrl] = useState(initialUrl);
  const [embedUrl, setEmbedUrl] = useState(buildEmbedUrl(initialUrl));

  // Edit modal state
  const [showEdit, setShowEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordOk, setPasswordOk] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ── Hide global Navbar & Footer for this standalone page ──────────────────
  useEffect(() => {
    document.body.setAttribute('data-ppt-page', 'true');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.removeAttribute('data-ppt-page');
      document.body.style.overflow = '';
    };
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync embed URL when pptUrl changes
  useEffect(() => {
    setEmbedUrl(buildEmbedUrl(pptUrl));
  }, [pptUrl]);

  // Listen for fullscreen changes (ESC key etc.)
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // ── Fullscreen toggle ──────────────────────────────────────────────────────
  const handlePresent = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // ── Password check ─────────────────────────────────────────────────────────
  const handlePasswordSubmit = useCallback(async () => {
    setPasswordError("");
    // We validate password via the API to keep it server-side
    const res = await fetch("/api/ppt-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, url: pptUrl }), // send current url to avoid wiping
    });
    if (res.ok) {
      setPasswordOk(true);
      setNewUrl(pptUrl);
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  }, [password, pptUrl]);

  // ── Save new URL ───────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!newUrl.trim()) {
      setSaveError("Please enter a valid URL.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/ppt-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, url: newUrl.trim() }),
      });
      if (res.ok) {
        setPptUrl(newUrl.trim());
        setSaveSuccess(true);
        setTimeout(() => {
          setShowEdit(false);
          setPasswordOk(false);
          setPassword("");
          setNewUrl("");
          setSaveSuccess(false);
        }, 1500);
      } else {
        setSaveError("Failed to save. Check your password and try again.");
      }
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [newUrl, password]);

  // ── Close modal reset ──────────────────────────────────────────────────────
  const closeModal = useCallback(() => {
    setShowEdit(false);
    setPasswordOk(false);
    setPassword("");
    setShowPassword(false);
    setPasswordError("");
    setNewUrl("");
    setSaveError("");
    setSaveSuccess(false);
  }, []);

  // ── Key handlers ───────────────────────────────────────────────────────────
  const onPasswordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handlePasswordSubmit();
  };
  const onUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <div
      className="ppt-root"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0d1117 0%, #111827 50%, #0a1628 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        fontFamily: "var(--font-body, Inter, sans-serif)",
      }}
    >
      {/* ── Top Bar ─────────────────────────────────────────────────────────── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 28px",
          borderBottom: "1px solid rgba(51,65,85,0.5)",
          background: "rgba(17,24,39,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        {/* Logo / Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #22C55E, #3B82F6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Presentation size={16} color="white" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
              fontWeight: 700,
              fontSize: 17,
              color: "#F1F5F9",
              letterSpacing: "-0.02em",
            }}
          >
            PurpleHub{" "}
            <span style={{ color: "#22C55E" }}>Deck</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          {/* Edit Button */}
          <motion.button
            id="ppt-edit-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowEdit(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 20px",
              borderRadius: 10,
              border: "1px solid rgba(51,65,85,0.8)",
              background: "rgba(30,41,59,0.7)",
              color: "#94A3B8",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#334155";
              (e.currentTarget as HTMLButtonElement).style.color = "#F1F5F9";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(51,65,85,0.8)";
              (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
            }}
          >
            <Pencil size={15} />
            Edit
          </motion.button>

          {/* Present Button */}
          <motion.button
            id="ppt-present-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handlePresent}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 22px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, #22C55E, #16A34A)",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(34,197,94,0.3)",
            }}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            {isFullscreen ? "Exit" : "Present"}
          </motion.button>
        </div>
      </header>

      {/* ── Viewer Area ─────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: embedUrl ? 0 : 40,
          background: "inherit",
          position: "relative",
        }}
      >
        {embedUrl ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              minHeight: "calc(100vh - 65px)",
              position: "relative",
            }}
          >
            {/* Overlay to prevent right-click / download sniffing */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
              }}
              onContextMenu={e => e.preventDefault()}
            />
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title="PurpleHub Presentation"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                minHeight: "calc(100vh - 65px)",
                border: "none",
                display: "block",
              }}
              onContextMenu={e => e.preventDefault()}
            />
          </div>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center",
              padding: "60px 40px",
              borderRadius: 24,
              border: "1px dashed rgba(51,65,85,0.7)",
              background: "rgba(30,41,59,0.4)",
              backdropFilter: "blur(8px)",
              maxWidth: 480,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(59,130,246,0.15))",
                border: "1px solid rgba(34,197,94,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <Presentation size={32} color="#22C55E" />
            </div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#F1F5F9",
                marginBottom: 12,
                fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
              }}
            >
              No Presentation Yet
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
              Click <strong style={{ color: "#F1F5F9" }}>Edit</strong> to paste your Canva, Google
              Slides, or any presentation link. It'll appear right here.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowEdit(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 24px",
                borderRadius: 10,
                border: "1px solid rgba(34,197,94,0.4)",
                background: "rgba(34,197,94,0.1)",
                color: "#22C55E",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Pencil size={15} />
              Add Presentation Link
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* ── Edit Modal ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showEdit && (
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
            onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
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
                maxWidth: 480,
                boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.05)",
                position: "relative",
              }}
            >
              {/* Close */}
              <button
                id="ppt-modal-close"
                onClick={closeModal}
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
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#F1F5F9";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(71,85,105,0.7)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(51,65,85,0.5)";
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
                    background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(59,130,246,0.2))",
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
                  {passwordOk ? "Update Presentation" : "Enter Edit Password"}
                </h3>
                <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 6 }}>
                  {passwordOk
                    ? "Paste your Canva, Google Slides, or PPTX link below."
                    : "This area is password-protected. Enter the password to continue."}
                </p>
              </div>

              {/* ─── Step 1: Password ─────────────────────────────────────── */}
              <AnimatePresence mode="wait">
                {!passwordOk ? (
                  <motion.div
                    key="password-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <label
                      htmlFor="ppt-password-input"
                      style={{ display: "block", fontSize: 13, color: "#94A3B8", marginBottom: 8, fontWeight: 500 }}
                    >
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        id="ppt-password-input"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setPasswordError(""); }}
                        onKeyDown={onPasswordKeyDown}
                        placeholder="Enter password..."
                        autoFocus
                        style={{
                          width: "100%",
                          padding: "12px 44px 12px 16px",
                          background: "rgba(15,23,42,0.7)",
                          border: `1px solid ${passwordError ? "rgba(239,68,68,0.5)" : "rgba(51,65,85,0.8)"}`,
                          borderRadius: 10,
                          color: "#F1F5F9",
                          fontSize: 15,
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s",
                          fontFamily: "inherit",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = passwordError ? "rgba(239,68,68,0.5)" : "rgba(51,65,85,0.8)"; }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
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
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {passwordError && (
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
                        {passwordError}
                      </motion.div>
                    )}

                    <motion.button
                      id="ppt-password-submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePasswordSubmit}
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
                      Unlock
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ─── Step 2: URL Input ──────────────────────────────────── */
                  <motion.div
                    key="url-step"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {/* Supported formats hint */}
                    <div
                      style={{
                        padding: "10px 14px",
                        borderRadius: 8,
                        background: "rgba(34,197,94,0.08)",
                        border: "1px solid rgba(34,197,94,0.15)",
                        marginBottom: 18,
                        fontSize: 12,
                        color: "#86EFAC",
                        lineHeight: 1.6,
                      }}
                    >
                      ✅ Supports: <strong>Canva embed</strong>, <strong>Google Slides</strong>, <strong>PPTX URL</strong> (OneDrive, Drive)
                    </div>

                    <label
                      htmlFor="ppt-url-input"
                      style={{ display: "block", fontSize: 13, color: "#94A3B8", marginBottom: 8, fontWeight: 500 }}
                    >
                      Presentation URL
                    </label>
                    <div style={{ position: "relative" }}>
                      <LinkIcon
                        size={15}
                        color="#64748B"
                        style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
                      />
                      <input
                        id="ppt-url-input"
                        type="url"
                        value={newUrl}
                        onChange={e => { setNewUrl(e.target.value); setSaveError(""); }}
                        onKeyDown={onUrlKeyDown}
                        placeholder="https://www.canva.com/design/..."
                        autoFocus
                        style={{
                          width: "100%",
                          padding: "12px 16px 12px 40px",
                          background: "rgba(15,23,42,0.7)",
                          border: `1px solid ${saveError ? "rgba(239,68,68,0.5)" : "rgba(51,65,85,0.8)"}`,
                          borderRadius: 10,
                          color: "#F1F5F9",
                          fontSize: 14,
                          outline: "none",
                          boxSizing: "border-box",
                          fontFamily: "inherit",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = saveError ? "rgba(239,68,68,0.5)" : "rgba(51,65,85,0.8)"; }}
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
                      id="ppt-save-btn"
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
                        opacity: saving ? 0.8 : 1,
                      }}
                    >
                      {saving ? (
                        <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</>
                      ) : saveSuccess ? (
                        <><CheckCircle size={16} /> Saved!</>
                      ) : (
                        "Save & Display"
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spin keyframe (for Loader2) */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
