"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, AlertCircle, Loader2, LogIn, Video } from "lucide-react";

interface VideoLoginScreenProps {
  onAuthenticated: () => void;
}

export default function VideoLoginScreen({ onAuthenticated }: VideoLoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/video-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        onAuthenticated();
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0B0F19 0%, #111827 50%, #0a1628 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "var(--font-body, Inter, sans-serif)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, #1E293B, #162032)",
          border: "1px solid rgba(51,65,85,0.8)",
          borderRadius: 24,
          padding: "48px 40px",
          width: "100%",
          maxWidth: 440,
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.05)",
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #22C55E, #3B82F6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 8px 24px rgba(34,197,94,0.3)",
          }}
        >
          <Video size={28} color="white" />
        </div>

        {/* Header */}
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#F1F5F9",
            textAlign: "center",
            marginBottom: 8,
            fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
            letterSpacing: "-0.02em",
          }}
        >
          Video Access
        </h1>
        <p
          style={{
            color: "#94A3B8",
            fontSize: 15,
            textAlign: "center",
            marginBottom: 32,
            lineHeight: 1.5,
          }}
        >
          Enter your credentials to view the video presentation
        </p>

        {/* Username Field */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="video-username"
            style={{
              display: "block",
              fontSize: 13,
              color: "#94A3B8",
              marginBottom: 8,
              fontWeight: 500,
            }}
          >
            Username
          </label>
          <div style={{ position: "relative" }}>
            <User
              size={16}
              color="#64748B"
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <input
              id="video-username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter username"
              autoFocus
              style={{
                width: "100%",
                padding: "13px 16px 13px 42px",
                background: "rgba(15,23,42,0.7)",
                border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(51,65,85,0.8)"}`,
                borderRadius: 10,
                color: "#F1F5F9",
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = error
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(51,65,85,0.8)";
              }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: 24 }}>
          <label
            htmlFor="video-password"
            style={{
              display: "block",
              fontSize: 13,
              color: "#94A3B8",
              marginBottom: 8,
              fontWeight: 500,
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <Lock
              size={16}
              color="#64748B"
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <input
              id="video-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "13px 44px 13px 42px",
                background: "rgba(15,23,42,0.7)",
                border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(51,65,85,0.8)"}`,
                borderRadius: 10,
                color: "#F1F5F9",
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = error
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(51,65,85,0.8)";
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
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
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              marginBottom: 20,
            }}
          >
            <AlertCircle size={16} color="#F87171" />
            <span style={{ color: "#F87171", fontSize: 13 }}>{error}</span>
          </motion.div>
        )}

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg, #22C55E, #16A34A)",
            color: "white",
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 0 20px rgba(34,197,94,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? (
            <>
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
              Authenticating...
            </>
          ) : (
            <>
              <LogIn size={16} />
              Sign In
            </>
          )}
        </motion.button>

        {/* Footer Note */}
        <p
          style={{
            marginTop: 24,
            textAlign: "center",
            fontSize: 12,
            color: "#64748B",
            lineHeight: 1.5,
          }}
        >
          Contact your administrator if you need access
        </p>
      </motion.div>

      {/* Spin keyframe */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
