"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, ChevronLeft, ChevronRight, ExternalLink, Pause, Play, RefreshCw } from "lucide-react";


interface LinkedInPost {
    number: string;
    title: string;
    url: string;
    embedUrl: string;
}

/* Convert a LinkedIn post URL to its embeddable version */
function toEmbedUrl(url: string): string {
    if (url.includes("/embed/")) return url;

    // Extract activity ID from URL
    const activityMatch = url.match(/activity[:-](\d+)/);
    if (activityMatch) {
        return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityMatch[1]}`;
    }

    const shareMatch = url.match(/share[:-](\d+)/);
    if (shareMatch) {
        return `https://www.linkedin.com/embed/feed/update/urn:li:share:${shareMatch[1]}`;
    }

    const ugcMatch = url.match(/ugcPost[:-](\d+)/);
    if (ugcMatch) {
        return `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${ugcMatch[1]}`;
    }

    return url;
}


export default function InsightsPageClient({ initialPosts = [] }: { initialPosts?: LinkedInPost[] }) {
    const [posts, setPosts] = useState<LinkedInPost[]>(initialPosts.map(p => ({
        ...p,
        embedUrl: toEmbedUrl(p.url)
    })));
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [loading, setLoading] = useState(false); // No longer loading initially
    const [error, setError] = useState<string | null>(null);

    const refreshPosts = useCallback(async () => {
        // Fallback or Refresh logic if needed, but for now we rely on server data
        // We can keep a simple refresh that calls the server-side again if wanted,
        // but it's simpler to just rely on the page reload for now.
    }, []);

    useEffect(() => {
        // Update posts if initialPosts change (e.g. on navigation)
        if (initialPosts.length > 0) {
            setPosts(initialPosts.map(p => ({
                ...p,
                embedUrl: toEmbedUrl(p.url)
            })));
        }
    }, [initialPosts]);

    const total = posts.length;

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
        const timer = setInterval(next, 10000);
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
                        Stay up-to-date with our latest insights and thought leadership
                        — straight from our LinkedIn.
                    </motion.p>
                </div>
            </section>

            {/* CAROUSEL / CONTENT */}
            <section className="py-20 lg:py-28">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    {loading ? (
                        /* ─── Loading state ─── */
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-10 h-10 border-2 border-primary-brand/30 border-t-primary-brand rounded-full animate-spin mb-4" />
                            <p className="text-text-secondary text-sm">Loading insights...</p>
                        </div>
                    ) : error ? (
                        /* ─── Error state ─── */
                        <div className="text-center py-20">
                            <p className="text-red-400 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border rounded-xl text-sm text-white hover:border-primary-brand transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh Page
                            </button>
                        </div>
                    ) : total === 0 ? (
                        /* ─── Empty state ─── */
                        <ScrollReveal>
                            <div className="p-12 border border-border rounded-3xl bg-surface/50 backdrop-blur-sm shadow-xl shadow-green-500/5 text-center">
                                <h2 className="text-2xl font-semibold text-white mb-4">
                                    Insights Coming Soon
                                </h2>
                                <p className="max-w-xl mx-auto mb-8 text-text-secondary leading-relaxed">
                                    Our latest insights and thought-leadership posts will appear here
                                    automatically. Follow us on LinkedIn to stay ahead!
                                </p>
                                <a
                                    href="https://in.linkedin.com/company/ph-techindia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a66c2] text-white rounded-xl font-medium text-sm hover:bg-[#004182] transition-colors"
                                >
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
                                    Post {current + 1} of {total}
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
                                    className="rounded-2xl overflow-hidden border border-border bg-surface/50 shadow-xl shadow-green-500/5 flex flex-col"
                                >
                                    {posts[current].title && (
                                        <div className="p-6 border-b border-border bg-surface/80 backdrop-blur-sm">
                                            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white line-clamp-2 leading-snug">
                                                {posts[current].title}
                                            </h3>
                                        </div>
                                    )}
                                    <iframe
                                        src={posts[current].embedUrl}
                                        width="100%"
                                        height="600"
                                        frameBorder="0"
                                        allowFullScreen
                                        title={`LinkedIn Post ${posts[current].number}`}
                                        className="w-full bg-white flex-1"
                                        style={{ minHeight: 500 }}
                                    />
                                    <div className="p-4 border-t border-border flex items-center justify-between">
                                        <p className="text-sm text-text-secondary">
                                            Post {posts[current].number}
                                        </p>
                                        <a
                                            href={posts[current].url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-primary-brand hover:text-green-400 transition-colors"
                                        >
                                            View on LinkedIn
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Dot indicators */}
                            <div className="flex justify-center gap-2 mt-6">
                                {posts.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrent(i)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            i === current
                                                ? "w-6 bg-primary-brand"
                                                : "w-2 bg-white/20 hover:bg-white/40"
                                        }`}
                                        aria-label={`Go to post ${i + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Follow CTA */}
                            <div className="mt-12 text-center">
                                <a
                                    href="https://in.linkedin.com/company/ph-techindia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a66c2] text-white rounded-xl font-medium text-sm hover:bg-[#004182] transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    Follow PurpleHub on LinkedIn
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
