"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react";

/* ─────────────────────────────────────────────
   ADD YOUR LINKEDIN POST URLS HERE
   Each entry needs a url and an optional caption.
   ───────────────────────────────────────────── */
const linkedinPosts: { url: string; caption?: string }[] = [
    // EXAMPLE — replace with real URLs:
    // { url: "https://www.linkedin.com/embed/feed/update/urn:li:share:1234567890", caption: "Our latest teaser" },
];

/* Helper: convert a LinkedIn post URL to an embeddable URL */
function toEmbedUrl(url: string): string {
    // If already an embed URL, return as-is
    if (url.includes("/embed/")) return url;

    // Extract the activity/share ID from various LinkedIn URL formats
    const activityMatch = url.match(/activity[:-](\d+)/);
    const shareMatch = url.match(/share[:-](\d+)/);
    const ugcMatch = url.match(/ugcPost[:-](\d+)/);

    if (activityMatch) {
        return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityMatch[1]}`;
    }
    if (shareMatch) {
        return `https://www.linkedin.com/embed/feed/update/urn:li:share:${shareMatch[1]}`;
    }
    if (ugcMatch) {
        return `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${ugcMatch[1]}`;
    }

    // Fallback: return original
    return url;
}

export default function InsightsPageClient() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const total = linkedinPosts.length;

    const next = useCallback(() => {
        if (total === 0) return;
        setCurrent((prev) => (prev + 1) % total);
    }, [total]);

    const prev = useCallback(() => {
        if (total === 0) return;
        setCurrent((prev) => (prev - 1 + total) % total);
    }, [total]);

    useEffect(() => {
        if (!isAutoPlaying || total <= 1) return;
        const timer = setInterval(next, 8000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, next, total]);

    return (
        <main className="min-h-screen bg-background text-text-primary selection:bg-primary-brand/30 pb-20">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-dark via-green-900 to-primary-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.3) 0%, transparent 50%)",
                        }}
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-green-200 mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        From Our LinkedIn
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
                    >
                        PurpleHub{" "}
                        <span className="bg-gradient-to-r from-primary-brand to-secondary bg-clip-text text-transparent">
                            Insights
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-lg text-green-200/80 max-w-2xl mx-auto"
                    >
                        Stay up-to-date with our latest teasers, thought leadership, and platform updates
                        — straight from our LinkedIn.
                    </motion.p>
                </div>
            </section>

            {/* CAROUSEL / CONTENT */}
            <section className="py-20 lg:py-28">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    {total === 0 ? (
                        /* ─── Empty state ─── */
                        <ScrollReveal>
                            <div className="p-12 border border-border rounded-3xl bg-surface/50 backdrop-blur-sm shadow-xl shadow-green-500/5 text-center">
                                <h2 className="text-2xl font-semibold text-white mb-4">
                                    Insights Coming Soon
                                </h2>
                                <p className="max-w-xl mx-auto mb-8 text-text-secondary leading-relaxed">
                                    Our latest teasers and thought-leadership posts will appear here
                                    automatically. Follow us on LinkedIn to stay ahead!
                                </p>
                                <a
                                    href="https://in.linkedin.com/company/ph-techindia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a66c2] text-white rounded-xl font-medium text-sm hover:bg-[#004182] transition-colors"
                                >
                                    {/* LinkedIn icon */}
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    Follow PurpleHub on LinkedIn
                                </a>
                            </div>
                        </ScrollReveal>
                    ) : (
                        /* ─── Rolling carousel ─── */
                        <div>
                            {/* Controls */}
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-sm text-text-secondary">
                                    {current + 1} / {total}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface transition-colors"
                                        aria-label={isAutoPlaying ? "Pause" : "Play"}
                                    >
                                        {isAutoPlaying ? (
                                            <Pause className="w-4 h-4" />
                                        ) : (
                                            <Play className="w-4 h-4" />
                                        )}
                                    </button>
                                    <button
                                        onClick={prev}
                                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface transition-colors"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={next}
                                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface transition-colors"
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Embedded post */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -60 }}
                                    transition={{ duration: 0.4 }}
                                    className="rounded-2xl overflow-hidden border border-border bg-surface/50 shadow-xl shadow-green-500/5"
                                >
                                    <iframe
                                        src={toEmbedUrl(linkedinPosts[current].url)}
                                        width="100%"
                                        height="600"
                                        frameBorder="0"
                                        allowFullScreen
                                        title={`LinkedIn Post ${current + 1}`}
                                        className="w-full"
                                        style={{ minHeight: 500 }}
                                    />
                                    {linkedinPosts[current].caption && (
                                        <div className="p-4 border-t border-border flex items-center justify-between">
                                            <p className="text-sm text-text-secondary">
                                                {linkedinPosts[current].caption}
                                            </p>
                                            <a
                                                href={linkedinPosts[current].url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary-brand hover:text-green-400 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Dot indicators */}
                            <div className="flex justify-center gap-2 mt-6">
                                {linkedinPosts.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrent(i)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            i === current
                                                ? "w-6 bg-primary-brand"
                                                : "bg-white/20 hover:bg-white/40"
                                        }`}
                                        aria-label={`Go to post ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
