"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TeasersPageClient() {
    return (
        <main className="min-h-screen bg-background text-text-primary selection:bg-primary-brand/30 pb-20">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-primary-dark via-green-900 to-primary-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.3) 0%, transparent 50%)",
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
                        Sneak Peeks
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
                    >
                        Feature{" "}
                        <span className="bg-gradient-to-r from-primary-brand to-secondary bg-clip-text text-transparent">
                            Teasers
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-lg text-green-200/80 max-w-2xl mx-auto"
                    >
                        Get an exclusive preview of what&apos;s coming next to PurpleHub. 
                        We&apos;re constantly evolving our continuous performance intelligence platform.
                    </motion.p>
                </div>
            </section>

            {/* TEASERS GRID */}
            <section className="py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-text-secondary">
                    <ScrollReveal>
                        <div className="p-12 border border-border rounded-3xl bg-surface/50 backdrop-blur-sm shadow-xl shadow-green-500/5">
                            <h2 className="text-2xl font-semibold text-white mb-4">More Teasers Coming Soon</h2>
                            <p className="max-w-xl mx-auto mb-8 leading-relaxed">
                                Our product team is hard at work building the next generation of 
                                performance intelligence tools. Stay tuned for upcoming feature drops, UI walkthroughs, and platform updates!
                            </p>
                            <Link
                                href="/platform"
                                className="inline-flex items-center gap-2 text-primary-brand hover:text-green-400 transition-colors font-medium border-b border-primary-brand/30 hover:border-green-400 pb-1"
                            >
                                Explore Current Features
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
