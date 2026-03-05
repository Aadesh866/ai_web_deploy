"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    BookOpen,
    FileText,
    Video,
    BarChart3,
    Clock,
    ArrowRight,
    Download,
    Calendar,
    Mail,
    Sparkles,
    User,
} from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const categories = ["All", "Research", "Guides", "Webinars", "Case Studies"];

const articles = [
    {
        category: "Research",
        title: "The Impact of Continuous Feedback on Employee Retention",
        excerpt: "New data shows organizations with real-time feedback see 31% lower turnover rates across all demographics.",
        author: "Dr. Maya Patel",
        readTime: "8 min read",
        gradient: "from-green-500 to-emerald-400",
    },
    {
        category: "Guides",
        title: "Manager's Guide to AI-Assisted Performance Reviews",
        excerpt: "A step-by-step framework for leveraging AI insights while maintaining the human touch in evaluations.",
        author: "Sarah Kim",
        readTime: "12 min read",
        gradient: "from-purple-500 to-violet-400",
    },
    {
        category: "Case Studies",
        title: "How ScaleUp Inc. Transformed Performance Culture",
        excerpt: "From annual reviews to continuous intelligence: a 2,000-person company's 18-month transformation journey.",
        author: "PurpleHub Team",
        readTime: "6 min read",
        gradient: "from-green-500 to-emerald-400",
    },
    {
        category: "Webinars",
        title: "Bias in Performance Reviews: Detection and Prevention",
        excerpt: "Watch our panel discussion on how AI can identify and mitigate unconscious bias in talent decisions.",
        author: "Panel Discussion",
        readTime: "45 min",
        gradient: "from-orange-500 to-amber-400",
    },
    {
        category: "Research",
        title: "The ROI of Performance Intelligence Platforms",
        excerpt: "Quantifying the business impact of moving from traditional HRMS to AI-powered performance management.",
        author: "James Okonkwo",
        readTime: "10 min read",
        gradient: "from-pink-500 to-rose-400",
    },
    {
        category: "Guides",
        title: "Building a Feedback Culture: A CHRO's Roadmap",
        excerpt: "Lessons from HR leaders who successfully shifted their organizations from review-centric to feedback-first.",
        author: "Linda Torres",
        readTime: "15 min read",
        gradient: "from-cyan-500 to-teal-400",
    },
];

const upcomingEvents = [
    {
        date: "Mar 15, 2026",
        title: "The Future of Performance Management: 2026 Trends",
        type: "Webinar",
    },
    {
        date: "Mar 22, 2026",
        title: "Workshop: Implementing Continuous Feedback at Scale",
        type: "Workshop",
    },
    {
        date: "Apr 5, 2026",
        title: "Panel: CHROs on AI-Driven Talent Decisions",
        type: "Panel",
    },
];

const categoryIcons: Record<string, typeof BookOpen> = {
    Research: BarChart3,
    Guides: BookOpen,
    Webinars: Video,
    "Case Studies": FileText,
};

export default function ResourcesPageClient() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredArticles =
        activeFilter === "All"
            ? articles
            : articles.filter((a) => a.category === activeFilter);

    return (
        <>
            {/* HERO */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-dark via-green-900 to-primary-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.3) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(168,85,247,0.2) 0%, transparent 50%)",
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
                        Resources
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                    >
                        Insights for the{" "}
                        <span className="bg-gradient-to-r from-primary-brand to-secondary bg-clip-text text-transparent">
                            Future of Work
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-lg text-green-200/80 max-w-2xl mx-auto"
                    >
                        Research, guides, and best practices from performance management experts
                    </motion.p>
                </div>
            </section>

            {/* FEATURED CONTENT */}
            <section className="py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="interactive-card group p-0 overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-brand/10 text-primary-brand text-xs font-semibold w-fit mb-4">
                                        <BarChart3 className="w-3 h-3" /> Featured Report
                                    </span>
                                    <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading mb-4">
                                        The State of Continuous Performance Management 2024
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed mb-6">
                                        Our comprehensive analysis of 500+ organizations reveals the
                                        practices, tools, and strategies driving superior performance
                                        outcomes. Learn what separates leaders from laggards.
                                    </p>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-brand text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-all duration-300 w-fit hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5">
                                        <Download className="w-4 h-4" /> Download Now
                                    </button>
                                </div>
                                <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 p-8 lg:p-12 flex items-center justify-center min-h-[280px]">
                                    <div className="relative w-full max-w-xs">
                                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-border">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <p className="text-xs text-text-secondary">Annual Report</p>
                                                    <p className="text-lg font-bold text-white font-heading">2024</p>
                                                </div>
                                                <div className="w-10 h-10 rounded-xl bg-primary-brand/10 flex items-center justify-center">
                                                    <BarChart3 className="w-5 h-5 text-primary-brand" />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                {[85, 65, 90, 45].map((w, i) => (
                                                    <div key={i} className="h-2 rounded-full bg-surface overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-gradient-to-r from-primary-brand to-secondary"
                                                            style={{ width: `${w}%` }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-4 -right-4 w-32 h-20 bg-white rounded-xl shadow-lg border border-border p-3">
                                            <p className="text-[8px] text-text-secondary mb-1">Key Finding</p>
                                            <p className="text-xs font-bold text-white">3x improvement</p>
                                            <p className="text-[8px] text-text-secondary">with AI feedback</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CONTENT GRID */}
            <section className="py-24 lg:py-32 bg-surface">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-12">
                        <p className="section-label">BROWSE RESOURCES</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            Latest insights
                        </h2>
                    </ScrollReveal>

                    {/* Filter tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeFilter === cat
                                    ? "bg-primary-brand text-white shadow-lg shadow-green-500/25"
                                    : "bg-white text-text-secondary border border-border hover:border-primary-brand hover:text-primary-brand"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Article Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredArticles.map((article) => {
                                const Icon = categoryIcons[article.category] || BookOpen;
                                return (
                                    <div key={article.title} className="interactive-card group h-full flex flex-col p-0 overflow-hidden">
                                        <div className={`h-2 bg-gradient-to-r ${article.gradient}`} />
                                        <div className="p-6 flex flex-col flex-1">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface text-text-secondary text-xs font-medium w-fit mb-4">
                                                <Icon className="w-3 h-3" /> {article.category}
                                            </span>
                                            <h3 className="text-lg font-bold text-white font-heading mb-3 group-hover:text-primary-brand transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-brand to-secondary flex items-center justify-center">
                                                        <User className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-xs text-text-secondary">{article.author}</span>
                                                </div>
                                                <span className="flex items-center gap-1 text-xs text-text-secondary">
                                                    <Clock className="w-3 h-3" /> {article.readTime}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="py-24 lg:py-32">
                <div className="max-w-2xl mx-auto px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="interactive-card text-center p-10 lg:p-14">
                            <div className="w-16 h-16 rounded-2xl bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-8 h-8 text-primary-brand" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-3">
                                Stay in the loop
                            </h2>
                            <p className="text-text-secondary mb-8">
                                Weekly insights on performance management, AI in HR, and the
                                future of work. No spam, we promise.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Your work email"
                                    className="flex-1 px-5 py-3 rounded-xl border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-primary-brand focus:ring-2 focus:ring-primary-brand/20 transition-all"
                                />
                                <button className="px-6 py-3 bg-primary-brand text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5 whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* BROCHURE VIEWER */}
            <section className="py-24 lg:py-32">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-12">
                        <p className="section-label">BROCHURE</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Explore the <span className="gradient-text">PurpleHub Brochure</span>
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            A comprehensive look at how PurpleHub transforms performance management — scroll through the full brochure below.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div
                            className="rounded-2xl border border-border overflow-hidden bg-surface shadow-xl"
                            onContextMenu={(e) => e.preventDefault()}
                            style={{ userSelect: "none" }}
                        >
                            <iframe
                                src="/purplehub-brochure.pdf#toolbar=0&navpanes=0&scrollbar=1"
                                className="w-full"
                                style={{ height: "80vh", minHeight: "600px", border: "none" }}
                                title="PurpleHub Brochure"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* EVENTS */}
            <section className="py-24 lg:py-32 bg-surface">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16">
                        <p className="section-label">UPCOMING EVENTS</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            Learn from the experts
                        </h2>
                    </ScrollReveal>

                    <StaggerContainer staggerDelay={0.1} className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <StaggerItem key={event.title}>
                                <div className="interactive-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-green-900/30 flex flex-col items-center justify-center text-primary-brand flex-shrink-0">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">{event.date} · {event.type}</p>
                                            <h3 className="font-heading font-bold text-white">{event.title}</h3>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2.5 border-2 border-primary-brand text-primary-brand rounded-xl font-semibold text-sm hover:bg-primary-brand hover:text-white transition-all duration-300 whitespace-nowrap">
                                        Register
                                    </button>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>
        </>
    );
}
