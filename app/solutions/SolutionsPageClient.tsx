"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Monitor,
    Factory,
    Briefcase,
    HeartPulse,
    UserCircle,
    Users,
    User,
    Crown,
    ChevronDown,
    ArrowRight,
    Quote,
    Sparkles,
    TrendingUp,
    Zap,
    Target,
    Award,
} from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const industries = [
    {
        icon: Monitor,
        title: "Technology & SaaS",
        description: "Manage performance across agile, cross-functional product teams with dynamic goal tracking.",
        metric: "42% faster review cycles",
        gradient: "from-green-500 to-emerald-400",
    },
    {
        icon: Factory,
        title: "Manufacturing",
        description: "Bridge the gap between floor teams and leadership with real-time performance signals.",
        metric: "35% reduction in turnover",
        gradient: "from-amber-500 to-orange-400",
    },
    {
        icon: Briefcase,
        title: "Professional Services",
        description: "Track impact across multiple client engagements and project-based work.",
        metric: "28% improvement in utilization",
        gradient: "from-green-500 to-emerald-400",
    },
    {
        icon: HeartPulse,
        title: "Healthcare",
        description: "Ensure compliance while delivering meaningful feedback to clinical and admin teams.",
        metric: "50% less review admin time",
        gradient: "from-green-500 to-emerald-400",
    },
];

const roles = [
    {
        icon: Crown,
        title: "CHROs & HR Leaders",
        painPoints: ["Lack of real-time performance data", "Inconsistent standards across managers", "Difficulty measuring culture impact"],
        solution: "Enterprise-wide performance intelligence with bias detection and trend analysis.",
    },
    {
        icon: Users,
        title: "Line Managers",
        painPoints: ["Too much admin, too little coaching", "Hard to track team across projects", "Annual reviews feel meaningless"],
        solution: "AI-assisted coaching nudges and continuous feedback tools that fit into your workflow.",
    },
    {
        icon: User,
        title: "Employees",
        painPoints: ["Unclear expectations", "Invisible contributions", "Unfair evaluations"],
        solution: "Transparent goals, peer recognition, and clear line of sight from effort to outcome.",
    },
    {
        icon: UserCircle,
        title: "C-Suite Executives",
        painPoints: ["No visibility into talent pipeline", "Reactive succession planning", "ROI of people programs unclear"],
        solution: "Predictive workforce analytics, succession readiness, and strategic talent dashboards.",
    },
];

const useCases = [
    {
        title: "Remote & Hybrid Teams",
        content: "Keep distributed teams connected with async feedback, virtual check-ins, and performance signals that don't rely on face time. Our platform captures digital collaboration patterns to ensure remote workers get fair visibility.",
    },
    {
        title: "Matrix Organizations",
        content: "Navigate dotted-line reporting with multi-rater feedback from project leads, functional managers, and peers. Purple Hub surfaces cross-functional contributions that traditional hierarchical reviews miss entirely.",
    },
    {
        title: "Agile & Cross-Functional Teams",
        content: "Track sprint-by-sprint contributions, capture peer feedback at project milestones, and align individual growth with team velocity. Built for the pace of modern product development.",
    },
    {
        title: "High-Growth Companies",
        content: "Scale performance processes without losing the culture that made you successful. Automated workflows, configurable review cycles, and AI-driven insights that grow with your team.",
    },
    {
        title: "Compliance-Heavy Industries",
        content: "Meet regulatory requirements for performance documentation while delivering a modern experience employees actually value. Full audit trails, automated compliance reporting, and configurable approval flows.",
    },
];

function AccordionItem({ item, isOpen, onToggle }: { item: typeof useCases[0]; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-brand/30">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-colors"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-heading font-bold text-primary-dark">{item.title}</span>
                <ChevronDown
                    className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                            {item.content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SolutionsPageClient() {
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    return (
        <>
            {/* HERO */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-dark via-green-900 to-primary-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle at 30% 50%, rgba(139,92,246,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(168,85,247,0.2) 0%, transparent 50%)",
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
                        Solutions
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                    >
                        Built for How Work{" "}
                        <span className="bg-gradient-to-r from-primary-brand to-secondary bg-clip-text text-transparent">
                            Actually Happens
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-lg text-green-200/80 max-w-2xl mx-auto"
                    >
                        Industry-specific solutions that address your unique challenges
                    </motion.p>
                </div>
            </section>

            {/* BY INDUSTRY */}
            <section className="py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16">
                        <p className="section-label">BY INDUSTRY</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark">
                            Tailored for your <span className="gradient-text">sector</span>
                        </h2>
                    </ScrollReveal>

                    <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {industries.map((industry) => (
                            <StaggerItem key={industry.title}>
                                <div className="interactive-card group h-full flex flex-col gap-5 p-8">
                                    <div className="flex items-start justify-between">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center card-icon transition-all duration-400 shadow-lg`}>
                                            <industry.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                                            {industry.metric}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-dark font-heading">{industry.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">{industry.description}</p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary-brand hover:gap-2 transition-all duration-300 mt-auto"
                                    >
                                        Learn more <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* BY ROLE */}
            <section className="py-24 lg:py-32 bg-surface">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16">
                        <p className="section-label">BY ROLE</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark">
                            Solutions for every <span className="gradient-text">stakeholder</span>
                        </h2>
                    </ScrollReveal>

                    <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {roles.map((role) => (
                            <StaggerItem key={role.title}>
                                <div className="interactive-card group h-full p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-green-900/30 flex items-center justify-center card-icon transition-all duration-400">
                                            <role.icon className="w-6 h-6 text-primary-brand" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary-dark font-heading">{role.title}</h3>
                                    </div>
                                    <div className="mb-5">
                                        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Pain Points</p>
                                        <ul className="space-y-2">
                                            {role.painPoints.map((point) => (
                                                <li key={point} className="flex items-start gap-2 text-sm text-text-secondary">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-warm mt-2 flex-shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl bg-green-900/20 border border-green-900/30">
                                        <p className="text-sm text-text-primary leading-relaxed">
                                            <span className="font-semibold text-primary-brand">Solution:</span>{" "}
                                            {role.solution}
                                        </p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* USE CASES */}
            <section className="py-24 lg:py-32">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16">
                        <p className="section-label">USE CASES</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark">
                            Solving real <span className="gradient-text">challenges</span>
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {useCases.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 0.05}>
                                <AccordionItem
                                    item={item}
                                    isOpen={openAccordion === i}
                                    onToggle={() => setOpenAccordion(openAccordion === i ? null : i)}
                                />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SUCCESS STORY */}
            <section className="py-24 lg:py-32 bg-green-900/20">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="bg-surface rounded-3xl p-8 lg:p-12 shadow-xl shadow-green-500/5 border border-border">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                <div>
                                    <p className="section-label">SUCCESS STORY</p>
                                    <Quote className="w-10 h-10 text-primary-brand/20 mb-4" />
                                    <blockquote className="text-xl font-heading font-bold text-primary-dark leading-snug mb-6">
                                        &ldquo;Purple Hub transformed how we think about talent
                                        development. Our manager effectiveness scores jumped 45% in the
                                        first year.&rdquo;
                                    </blockquote>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-brand to-secondary flex items-center justify-center text-white text-sm font-bold">
                                            RM
                                        </div>
                                        <div>
                                            <p className="font-semibold text-primary-dark text-sm">Rachel Martinez</p>
                                            <p className="text-xs text-text-secondary">CHRO, ScaleUp Inc.</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/resources"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-brand hover:gap-3 transition-all"
                                    >
                                        Read full story <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: TrendingUp, value: "45%", label: "Manager effectiveness" },
                                        { icon: Zap, value: "3x", label: "Feedback frequency" },
                                        { icon: Target, value: "92%", label: "Goal completion" },
                                        { icon: Award, value: "60%", label: "Less review time" },
                                    ].map((metric) => (
                                        <div key={metric.label} className="p-4 rounded-xl bg-surface border border-border text-center">
                                            <metric.icon className="w-6 h-6 text-primary-brand mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-primary-dark font-heading">{metric.value}</p>
                                            <p className="text-xs text-text-secondary">{metric.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ROI SECTION */}
            <section className="py-24 lg:py-32">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
                    <ScrollReveal>
                        <p className="section-label">ROI CALCULATOR</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark mb-6">
                            Calculate your <span className="gradient-text">potential savings</span>
                        </h2>
                        <p className="text-lg text-text-secondary mb-10">
                            See how much time, money, and effort Purple Hub can save your
                            organization. Schedule a consultation for a personalized ROI analysis.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-10 py-4 bg-primary-brand text-white rounded-2xl font-semibold text-lg hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1"
                        >
                            Get Your ROI Estimate <ArrowRight className="w-5 h-5" />
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
