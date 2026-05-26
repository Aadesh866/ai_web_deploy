"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, Presentation, LogOut, Settings } from "lucide-react";
import AdminModal from "./AdminModal";

// ─── URL normalizer ────────────────────────────────────────────────────────────
function buildEmbedUrl(url: string): string {
  if (!url) return "";

  let parsedUrl = url.trim();
  
  const srcMatch = parsedUrl.match(/src=["'](.*?)["']/i);
  if (srcMatch) {
    parsedUrl = srcMatch[1];
  }

  if (parsedUrl.includes("canva.com/embed") || parsedUrl.includes("canva.com/design")) {
    if (!parsedUrl.includes("embed")) return parsedUrl + "?embed";
    return parsedUrl;
  }

  if (parsedUrl.includes("docs.google.com/presentation")) {
    return parsedUrl
      .replace("/edit", "/embed")
      .replace("/pub", "/embed")
      .replace(/\/embed\?.*/, "/embed?start=false&loop=false&delayms=3000");
  }

  const isPowerPoint = 
    parsedUrl.toLowerCase().includes(".pptx") || 
    parsedUrl.toLowerCase().includes(".ppsx") || 
    parsedUrl.toLowerCase().includes(".pps");

  if (
    isPowerPoint ||
    parsedUrl.includes("1drv.ms") ||
    parsedUrl.includes("sharepoint.com") ||
    parsedUrl.includes("onedrive.live.com")
  ) {
    const encoded = encodeURIComponent(parsedUrl);
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encoded}`;
  }

  return parsedUrl;
}

// ─── Props ─────────────────────────────────────────────────────────────────────
interface PPTPageClientProps {
  initialUrl: string;
  supabaseUrl: string;
  supabaseKey: string;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function PPTPageClient({ initialUrl, supabaseUrl, supabaseKey }: PPTPageClientProps) {
  const [pptUrl, setPptUrl] = useState(initialUrl);
  const [embedUrl, setEmbedUrl] = useState(buildEmbedUrl(initialUrl));
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ── Hide global Navbar & Footer ────────────────────────────────────────────
  useEffect(() => {
    document.body.setAttribute('data-ppt-page', 'true');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.removeAttribute('data-ppt-page');
      document.body.style.overflow = '';
    };
  }, []);

  // Sync embed URL when pptUrl changes
  useEffect(() => {
    setEmbedUrl(buildEmbedUrl(pptUrl));
  }, [pptUrl]);

  // Listen for fullscreen changes
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

  // ── Logout ─────────────────────────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    await fetch("/api/ppt-auth", { method: "DELETE" });
    window.location.reload();
  }, []);

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
        {/* Logo */}
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
            Purplehub
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          {/* Admin Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowAdminModal(true)}
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
            <Settings size={15} />
            Admin
          </motion.button>

          {/* Present Button */}
          <motion.button
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

          {/* Logout Button */}
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
              background: "rgba(127,29,29,0.3)",
              color: "#F87171",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.5)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(127,29,29,0.5)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.3)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(127,29,29,0.3)";
            }}
          >
            <LogOut size={15} />
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
            {/* Overlay to prevent right-click */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
              }}
              onContextMenu={e => e.preventDefault()}
            />

            {/* Block Microsoft Office download button */}
            {embedUrl?.includes("officeapps.live.com") && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 160,
                  height: 44,
                  zIndex: 2,
                  background: "transparent",
                  pointerEvents: "auto", 
                  cursor: "not-allowed",
                }}
                title="Download disabled"
                onContextMenu={e => e.preventDefault()}
              />
            )}
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title="Purplehub Presentation"
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
              Click <strong style={{ color: "#F1F5F9" }}>Admin</strong> to add your presentation.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowAdminModal(true)}
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
              <Settings size={15} />
              Admin Settings
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* ── Admin Modal ─────────────────────────────────────────────────────── */}
      <AdminModal
        show={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        pptUrl={pptUrl}
        onPptUrlUpdate={setPptUrl}
        supabaseUrl={supabaseUrl}
        supabaseKey={supabaseKey}
      />
    </div>
  );
}
