"use client";

import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link as LinkIcon, Maximize, Minimize, X, Video as VideoIcon, Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react";

export default function VideoClient() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- File Upload ---
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
        setError(null);
      } else {
        setError("Please upload a valid video file (MP4, WebM, MOV).");
      }
    }
  };

  // --- URL Submit ---
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setVideoUrl(inputUrl.trim());
      setError(null);
    }
  };

  // --- Playback Controls ---
  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, []);

  const skip = useCallback((seconds: number) => {
    const vid = videoRef.current;
    if (!vid) return;
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
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = videoRef.current;
    if (!vid) return;
    const time = parseFloat(e.target.value);
    vid.currentTime = time;
    setCurrentTime(time);
  }, []);

  // --- Auto-hide controls ---
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3000);
  }, []);

  // --- Events ---
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onTimeUpdate = () => {
      setCurrentTime(vid.currentTime);
      setProgress(vid.duration ? (vid.currentTime / vid.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => {
      setDuration(vid.duration);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    vid.addEventListener("timeupdate", onTimeUpdate);
    vid.addEventListener("loadedmetadata", onLoadedMetadata);
    vid.addEventListener("ended", onEnded);

    return () => {
      vid.removeEventListener("timeupdate", onTimeUpdate);
      vid.removeEventListener("loadedmetadata", onLoadedMetadata);
      vid.removeEventListener("ended", onEnded);
    };
  }, [videoUrl]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!videoUrl) return;
      switch (e.key) {
        case " ": e.preventDefault(); togglePlay(); break;
        case "ArrowLeft": skip(-10); break;
        case "ArrowRight": skip(10); break;
        case "m": toggleMute(); break;
        case "f": toggleFullscreen(); break;
      }
      resetControlsTimer();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [videoUrl, togglePlay, skip, toggleMute, toggleFullscreen, resetControlsTimer]);

  const resetVideo = () => {
    setVideoUrl("");
    setInputUrl("");
    setIsPlaying(false);
    setError(null);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    if (document.fullscreenElement) document.exitFullscreen();
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-brand/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center mb-10">
              <div className="w-16 h-16 bg-primary-brand/20 text-primary-brand rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <VideoIcon className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Present a Video</h1>
              <p className="text-text-secondary text-sm">
                Upload a video from your device or paste an external link to begin the presentation.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-6 relative z-10">
              {/* File Upload Area */}
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
                  <p className="text-xs text-text-secondary">MP4, WebM, MOV</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-text-secondary text-sm">
                <div className="h-[1px] flex-1 bg-border" />
                <span>OR</span>
                <div className="h-[1px] flex-1 bg-border" />
              </div>

              {/* URL Input */}
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
            onClick={(e) => {
              // Only toggle play if clicking the video area, not controls
              if ((e.target as HTMLElement).tagName === "VIDEO") togglePlay();
            }}
            className={`relative bg-black overflow-hidden transition-all duration-300 ${
              isFullscreen
                ? "fixed inset-0 z-50 rounded-none"
                : "w-full max-w-5xl rounded-3xl shadow-2xl border border-border aspect-video"
            }`}
          >
            {/* The Video Element */}
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain bg-black"
              playsInline
            />

            {/* Custom Controls Overlay */}
            <div
              className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Top gradient + close/fullscreen */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-5 bg-gradient-to-b from-black/70 to-transparent">
                <button
                  onClick={resetVideo}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/80 text-white rounded-full backdrop-blur-md transition-colors"
                  title="Close Video"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-md transition-colors"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>

              {/* Bottom controls bar */}
              <div className="bg-gradient-to-t from-black/80 to-transparent pt-16 pb-4 px-4 sm:px-6">
                {/* Progress bar */}
                <div className="relative group mb-3">
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-primary-brand [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary-brand [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:[&::-webkit-slider-thumb]:w-4 group-hover:[&::-webkit-slider-thumb]:h-4 transition-all"
                    style={{
                      background: `linear-gradient(to right, #22c55e ${progress}%, rgba(255,255,255,0.2) ${progress}%)`
                    }}
                  />
                </div>

                {/* Buttons row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Rewind 10s */}
                    <button onClick={() => skip(-10)} className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all" title="Rewind 10s">
                      <RotateCcw className="w-5 h-5" />
                    </button>

                    {/* Play / Pause */}
                    <button onClick={togglePlay} className="w-12 h-12 flex items-center justify-center bg-white/15 hover:bg-primary-brand text-white rounded-full backdrop-blur-sm transition-all shadow-lg" title={isPlaying ? "Pause" : "Play"}>
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>

                    {/* Forward 10s */}
                    <button onClick={() => skip(10)} className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all" title="Forward 10s">
                      <RotateCw className="w-5 h-5" />
                    </button>

                    {/* Mute */}
                    <button onClick={toggleMute} className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all ml-1" title={isMuted ? "Unmute" : "Mute"}>
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>

                    {/* Time */}
                    <span className="text-white/70 text-xs font-mono ml-2">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Keyboard shortcuts hint */}
                  <div className="hidden sm:flex items-center gap-2 text-white/30 text-[10px]">
                    <span className="px-1.5 py-0.5 bg-white/10 rounded">Space</span>
                    <span className="px-1.5 py-0.5 bg-white/10 rounded">← →</span>
                    <span className="px-1.5 py-0.5 bg-white/10 rounded">M</span>
                    <span className="px-1.5 py-0.5 bg-white/10 rounded">F</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Play overlay when paused */}
            {!isPlaying && showControls && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
