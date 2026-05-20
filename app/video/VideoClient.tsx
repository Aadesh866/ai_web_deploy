"use client";

import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link as LinkIcon, Maximize, Minimize, X, Video as VideoIcon, Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, RefreshCw } from "lucide-react";

// ─── IndexedDB helpers for video persistence ───
const DB_NAME = "purplehub_video";
const STORE_NAME = "videos";
const VIDEO_KEY = "current_video";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveVideoToDB(blob: Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, VIDEO_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function loadVideoFromDB(): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(VIDEO_KEY);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function clearVideoFromDB(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(VIDEO_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ─── Component ───
export default function VideoClient() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Load persisted video on mount ───
  useEffect(() => {
    (async () => {
      try {
        const blob = await loadVideoFromDB();
        if (blob) {
          const url = URL.createObjectURL(blob);
          setVideoUrl(url);
        }
      } catch {
        // No saved video, that's fine
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ─── File Upload ───
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file (MP4, WebM, MOV).");
      return;
    }
    // Revoke old blob
    if (videoUrl.startsWith("blob:")) URL.revokeObjectURL(videoUrl);
    // Save to IndexedDB for persistence
    await saveVideoToDB(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setError(null);
    setIsPlaying(true);
  };

  // ─── URL Submit ───
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    if (videoUrl.startsWith("blob:")) URL.revokeObjectURL(videoUrl);
    // For external URLs, save the URL string in IndexedDB as a text blob
    const urlBlob = new Blob([inputUrl.trim()], { type: "text/plain" });
    await saveVideoToDB(urlBlob);
    setVideoUrl(inputUrl.trim());
    setError(null);
    setIsPlaying(true);
  };

  // ─── Playback Controls ───
  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, []);

  const skip = useCallback((seconds: number) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    vid.currentTime = Math.max(0, Math.min(vid.duration, vid.currentTime + seconds));
  }, []);

  const toggleMute = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const cyclePlaybackRate = useCallback(() => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) videoRef.current.playbackRate = nextRate;
  }, [playbackRate]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = videoRef.current;
    if (!vid) return;
    const time = parseFloat(e.target.value);
    vid.currentTime = time;
    setCurrentTime(time);
    setProgress(vid.duration ? (time / vid.duration) * 100 : 0);
  };

  // ─── Auto-hide controls ───
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3000);
  }, []);

  // ─── Video element event handlers ───
  const onLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setDuration(vid.duration);
    vid.playbackRate = playbackRate;
    vid.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const onTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setCurrentTime(vid.currentTime);
    setProgress(vid.duration ? (vid.currentTime / vid.duration) * 100 : 0);
  };

  const onEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  const onVideoPlay = () => setIsPlaying(true);
  const onVideoPause = () => setIsPlaying(false);

  // ─── Fullscreen listener ───
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ─── Keyboard shortcuts ───
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!videoUrl) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      switch (e.key) {
        case " ": e.preventDefault(); togglePlay(); break;
        case "ArrowLeft": skip(-5); break;
        case "ArrowRight": skip(5); break;
        case "m": case "M": toggleMute(); break;
        case "f": case "F": toggleFullscreen(); break;
      }
      resetControlsTimer();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [videoUrl, togglePlay, skip, toggleMute, toggleFullscreen, resetControlsTimer]);

  const resetVideo = async () => {
    if (videoUrl.startsWith("blob:")) URL.revokeObjectURL(videoUrl);
    await clearVideoFromDB();
    setVideoUrl("");
    setInputUrl("");
    setIsPlaying(false);
    setError(null);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };

  const formatTime = (s: number) => {
    if (!s || !isFinite(s)) return "0:00";
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Loading state while checking IndexedDB
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="animate-pulse text-text-secondary text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <AnimatePresence mode="wait">
        {!videoUrl ? (
          /* ───────── Upload UI ───────── */
          <motion.div
            key="upload-ui"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl bg-surface border border-border rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-brand/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center mb-10">
              <div className="w-16 h-16 bg-primary-brand/20 text-primary-brand rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <VideoIcon className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Present a Video</h1>
              <p className="text-text-secondary text-sm">
                Upload a video from your device or paste an external link to begin the presentation. Your video will be saved automatically.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-6 relative z-10">
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  id="video-upload"
                />
                <div className="w-full border-2 border-dashed border-border hover:border-primary-brand/50 bg-surface-light rounded-2xl p-8 text-center transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary-brand/20 transition-all">
                    <Upload className="w-6 h-6 text-text-secondary group-hover:text-primary-brand" />
                  </div>
                  <p className="text-white font-semibold mb-1">Click or drag video to upload</p>
                  <p className="text-xs text-text-secondary">MP4, WebM, MOV — saved automatically</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-text-secondary text-sm">
                <div className="h-[1px] flex-1 bg-border" />
                <span>OR</span>
                <div className="h-[1px] flex-1 bg-border" />
              </div>

              <form onSubmit={handleUrlSubmit} className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <LinkIcon className="w-5 h-5 text-text-secondary" />
                </div>
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Paste a direct video URL (.mp4, .webm)"
                  className="w-full bg-surface-light border border-border text-white text-sm rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand transition-all placeholder:text-text-secondary"
                  required
                />
                <button
                  type="submit"
                  className="absolute inset-y-2 right-2 px-6 bg-primary-brand hover:bg-primary-brand-light text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Load
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* ───────── Player UI ───────── */
          <motion.div
            key="player-ui"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            ref={containerRef}
            onMouseMove={resetControlsTimer}
            className={`relative bg-black overflow-hidden transition-all duration-300 ${
              isFullscreen
                ? "fixed inset-0 z-50 rounded-none"
                : "w-full max-w-5xl rounded-3xl shadow-2xl border border-border aspect-video"
            }`}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain bg-black"
              playsInline
              onLoadedMetadata={onLoadedMetadata}
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              onPlay={onVideoPlay}
              onPause={onVideoPause}
            />

            {/* Click-to-play area */}
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={togglePlay}
            />

            {/* Controls Overlay */}
            <div
              className={`absolute inset-0 flex flex-col justify-between pointer-events-none transition-opacity duration-300 z-20 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-b from-black/70 to-transparent pointer-events-auto">
                <button
                  onClick={resetVideo}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/80 text-white rounded-full backdrop-blur-md transition-colors"
                  title="Close & Remove Video"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {/* Change video button */}
                  <label className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer" title="Change Video">
                    <RefreshCw className="w-4 h-4" />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={toggleFullscreen}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-md transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Bottom controls */}
              <div className="bg-gradient-to-t from-black/80 to-transparent pt-16 pb-4 px-4 sm:px-6 pointer-events-auto">
                {/* Seek bar */}
                <div className="relative group mb-3">
                  <input
                    type="range"
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 appearance-none bg-white/20 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary-brand [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(34,197,94,0.6)] [&::-webkit-slider-thumb]:cursor-pointer transition-all"
                    style={{
                      background: `linear-gradient(to right, #22c55e ${progress}%, rgba(255,255,255,0.2) ${progress}%)`
                    }}
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button onClick={() => skip(-5)} className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all" title="Rewind 5s">
                      <RotateCcw className="w-5 h-5" />
                    </button>

                    <button onClick={togglePlay} className="w-12 h-12 flex items-center justify-center bg-white/15 hover:bg-primary-brand text-white rounded-full backdrop-blur-sm transition-all shadow-lg" title={isPlaying ? "Pause" : "Play"}>
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>

                    <button onClick={() => skip(5)} className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all" title="Forward 5s">
                      <RotateCw className="w-5 h-5" />
                    </button>

                    <button onClick={toggleMute} className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all ml-1" title={isMuted ? "Unmute" : "Mute"}>
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>

                    <span className="text-white/70 text-xs font-mono ml-2 select-none">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Playback speed */}
                    <button
                      onClick={cyclePlaybackRate}
                      className="px-2.5 py-1 text-xs font-bold text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all select-none"
                      title="Playback Speed"
                    >
                      {playbackRate}x
                    </button>

                    {/* Keyboard hints */}
                    <div className="hidden sm:flex items-center gap-1.5 text-white/30 text-[10px] select-none ml-2">
                      <span className="px-1.5 py-0.5 bg-white/10 rounded">Space</span>
                      <span className="px-1.5 py-0.5 bg-white/10 rounded">← →</span>
                      <span className="px-1.5 py-0.5 bg-white/10 rounded">M</span>
                      <span className="px-1.5 py-0.5 bg-white/10 rounded">F</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center play icon when paused */}
            {!isPlaying && showControls && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Play className="w-10 h-10 text-white ml-1" />
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
