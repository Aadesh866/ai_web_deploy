"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
    MessageSquare,
    Brain,
    Globe2,
    LineChart,
    BellRing,
    Workflow,
    ArrowRight,
    Link2,
    Shield,
    Database,
    Cloud,
    Lock,
    CheckCircle2,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const features = [
    {
        icon: MessageSquare,
        title: "Continuous Feedback Engine",
        description: "Real-time multi-source feedback that captures contributions as they happen",
        gradient: "from-green-500 to-emerald-400",
    },
    {
        icon: Brain,
        title: "AI-Powered Insights",
        description: "Pattern recognition and bias detection for fairer evaluations",
        gradient: "from-purple-500 to-violet-400",
    },
    {
        icon: Globe2,
        title: "360° Visibility",
        description: "Cross-functional impact tracking beyond direct reports",
        gradient: "from-cyan-500 to-teal-400",
    },
    {
        icon: LineChart,
        title: "Predictive Analytics",
        description: "Succession readiness and flight risk indicators",
        gradient: "from-orange-500 to-amber-400",
    },
    {
        icon: BellRing,
        title: "Behavioral Nudges",
        description: "In-the-moment coaching suggestions for managers",
        gradient: "from-green-500 to-emerald-400",
    },
    {
        icon: Workflow,
        title: "Intelligent Automation",
        description: "Workflows that reduce admin burden by 70%",
        gradient: "from-pink-500 to-rose-400",
    },
];

const steps = [
    {
        num: "01",
        title: "Connect",
        description: "Integrate with your HRIS and tools",
        icon: Link2,
    },
    {
        num: "02",
        title: "Collect",
        description: "Gather continuous feedback and signals",
        icon: MessageSquare,
    },
    {
        num: "03",
        title: "Analyze",
        description: "AI processes patterns and insights",
        icon: Brain,
    },
    {
        num: "04",
        title: "Act",
        description: "Drive decisions with confidence",
        icon: ArrowRight,
    },
];

const techCapabilities = [
    { icon: Shield, label: "SOC 2 Type II" },
    { icon: Lock, label: "GDPR Compliant" },
    { icon: Database, label: "ISO 27001" },
    { icon: Cloud, label: "99.99% Uptime" },
];

const integrations = [
    "Slack", "Microsoft Teams", "Workday", "BambooHR", "SAP SuccessFactors",
    "ADP", "Google Workspace", "Jira", "Asana", "Salesforce", "Zoom", "Okta",
];

const comparisonData: { feature: string; tools: string[]; purplehub: string }[] = [
    { feature: "Role Blueprinting with clear lane for people", tools: ["Only through KRAs & OKRs", "Only through KRAs & OKRs", "Only through KRAs & OKRs", "Only through KRAs & OKRs", "Only through KRAs & OKRs"], purplehub: "Intuitively designed" },
    { feature: "Real-time check-ins on contribution", tools: ["—", "—", "Yes", "Yes", "—"], purplehub: "Intuitively designed" },
    { feature: "Performance and productivity metrics", tools: ["—", "Yes", "Yes", "Yes", "Yes"], purplehub: "Intuitively designed" },
    { feature: "Recognition as a culture", tools: ["If driven by internal teams", "Yes", "Yes", "Yes", "Yes"], purplehub: "Intuitively designed" },
    { feature: "People's engagement and pulse through work", tools: ["—", "Yes", "Yes", "Yes", "Yes"], purplehub: "Intuitively designed" },
    { feature: "Potential Mapping of talent", tools: ["Partially available", "Partially available", "Yes", "Yes", "Partially available"], purplehub: "Intuitively designed" },
    { feature: "Analytics tailored to persona & stakeholders", tools: ["Depends on maturity", "Depends on maturity", "Depends on maturity", "Partially available", "Unknown"], purplehub: "Intuitively designed" },
    { feature: "Talent Mastery Mapping", tools: ["Depends on maturity", "Depends on maturity", "Depends on maturity", "Depends on maturity", "Depends on maturity"], purplehub: "Intuitively designed" },
    { feature: "Career architecting", tools: ["Depends on maturity", "Depends on maturity", "Depends on maturity", "Depends on maturity", "Depends on maturity"], purplehub: "Intuitively designed" },
    { feature: "Leadership capacity consumed in execution", tools: ["Very very high", "Very very high", "Very high", "High", "High"], purplehub: "Very very low" },
    { feature: "Driving culture & values-centric behaviours", tools: ["Extremely difficult", "Extremely difficult", "Difficult", "Difficult", "Difficult"], purplehub: "Intuitively designed" },
    { feature: "Capacity to pivot with changing priorities", tools: ["Only through KRAs & OKRs", "Only through KRAs & OKRs", "Only through KRAs & OKRs", "Only through KRAs & OKRs", "Only through KRAs & OKRs"], purplehub: "Intuitively designed" },
    { feature: "One Interface. Multiple Talent Outcomes", tools: ["Extremely difficult", "Extremely difficult", "Difficult", "Difficult", "Unknown"], purplehub: "Yes" },
    { feature: "Operational simplicity for HR", tools: ["Extremely difficult", "Extremely difficult", "Yes", "Difficult", "Difficult"], purplehub: "Extremely easy" },
    { feature: "Multidimensional performance intelligence", tools: ["Only through KRAs & OKRs", "Only through KRAs & OKRs", "Only through KRAs & OKRs", "Only through KRAs & OKRs", "Only through KRAs & OKRs"], purplehub: "Intuitively designed" },
    { feature: "Built-in mechanisms to shape performance culture", tools: ["Depends on maturity", "Depends on maturity", "Depends on maturity", "Depends on maturity", "Not available"], purplehub: "Intuitively designed" },
    { feature: "Quantifying contributions for clarity", tools: ["Not available", "Not available", "Not available", "Not available", "Not available"], purplehub: "Yes" },
    { feature: "Leveraging AI to capture impact", tools: ["Not available", "Not available", "Not available", "Partially available", "Unknown"], purplehub: "Yes" },
    { feature: "Autonomous Agentic AI for Insights", tools: ["Not available", "Not available", "Not available", "Not available", "Not available"], purplehub: "Yes" },
    { feature: "Better measure of L&D investment & outcomes", tools: ["Not integrated", "Not integrated", "Not integrated", "Process level only", "Unknown"], purplehub: "Intuitively designed" },
];

function ComparisonBadge({ value }: { value: string }) {
    const lower = value.toLowerCase();
    if (lower === "—" || lower === "not available" || lower === "not integrated" || lower === "unknown") {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                ✕ {value}
            </span>
        );
    }
    if (lower.includes("difficult") || lower.includes("very high") || lower.includes("very very high") || lower === "high") {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                ⚠ {value}
            </span>
        );
    }
    if (lower.includes("depends") || lower.includes("partially") || lower.includes("only through") || lower.includes("if driven") || lower.includes("process level")) {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                ◐ {value}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
            ✓ {value}
        </span>
    );
}

function TimelineSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Line progresses smoothly across the full scroll
    const lineWidth = useTransform(scrollYProgress, [0, 0.85], ["25%", "100%"]);

    return (
        <div ref={containerRef} style={{ height: "400vh" }} className="relative">
            <div className="sticky top-0 h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="text-center mb-16">
                        <p className="section-label">HOW IT WORKS</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                            From chaos to <span className="gradient-text">clarity</span> in 4 steps
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary-brand to-secondary"
                                style={{ width: lineWidth }}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {steps.map((step, i) => (
                                <TimelineStep key={step.num} step={step} index={i} scrollYProgress={scrollYProgress} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineStep({ step, index, scrollYProgress }: {
    step: typeof steps[0];
    index: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    // Step 1 (index 0) is always visible
    // Steps 2-4 ease in with a smooth window (~8% scroll range each)
    const thresholds = [0, 0.15, 0.40, 0.65];
    const threshold = thresholds[index] || 0;
    const window = 0.08;

    const opacity = index === 0
        ? useTransform(scrollYProgress, [0], [1])
        : useTransform(scrollYProgress, [threshold, threshold + window], [0, 1]);

    const y = index === 0
        ? useTransform(scrollYProgress, [0], [0])
        : useTransform(scrollYProgress, [threshold, threshold + window], [30, 0]);

    return (
        <motion.div style={{ opacity, y }} className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-surface border-2 border-border shadow-lg mx-auto mb-6 flex items-center justify-center group hover:border-primary-brand hover:shadow-xl hover:shadow-green-500/10 transition-all duration-400">
                <step.icon className="w-8 h-8 text-primary-brand" />
            </div>
            <p className="text-xs font-mono text-primary-brand font-bold mb-2">{step.num}</p>
            <h3 className="text-xl font-bold text-white font-heading mb-2">{step.title}</h3>
            <p className="text-text-secondary text-sm">{step.description}</p>
        </motion.div>
    );
}

export default function PlatformPageClient() {
    return (
        <>
            {/* HERO */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-dark via-green-900 to-primary-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(139,92,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(168,85,247,0.2) 0%, transparent 50%)",
                        }}
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-green-200 mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Platform
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                    >
                        The Intelligence Behind{" "}
                        <span className="bg-gradient-to-r from-primary-brand to-secondary bg-clip-text text-transparent">
                            Better Performance
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-6 text-lg text-green-200/80 max-w-2xl mx-auto"
                    >
                        AI-powered continuous performance management that adapts to how your
                        teams actually work
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="#features"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-brand text-white rounded-2xl font-semibold hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1"
                        >
                            Explore Features <ChevronRight className="w-4 h-4" />
                        </Link>
                        <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">
                            Watch Demo
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-24 lg:py-32 bg-surface overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16">
                        <p className="section-label">WHY PURPLEHUB</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                            See how PurpleHub{" "}
                            <span className="gradient-text">outperforms</span> the rest
                        </h2>
                        <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                            A side-by-side comparison of 20 critical performance management capabilities
                        </p>
                    </ScrollReveal>

                    <div className="overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full min-w-[900px] text-sm">
                            <thead>
                                <tr className="bg-primary-dark/80">
                                    <th className="text-left p-4 text-white font-heading font-semibold min-w-[250px] sticky left-0 bg-primary-dark/80 z-10">
                                        Feature
                                    </th>
                                    {["Tool 1", "Tool 2", "Tool 3", "Tool 4", "Tool 5"].map((tool) => (
                                        <th key={tool} className="p-4 text-center text-text-secondary font-medium min-w-[130px]">
                                            {tool}
                                        </th>
                                    ))}
                                    <th className="p-4 text-center font-heading font-bold min-w-[150px] bg-green-500/20 text-primary-brand border-l-2 border-primary-brand/30 sticky right-0 z-10">
                                        🟢 PurpleHub
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr key={i} className={`border-t border-border/50 ${i % 2 === 0 ? "bg-surface" : "bg-primary-dark/20"} hover:bg-primary-dark/40 transition-colors`}>
                                        <td className={`p-4 font-medium text-white sticky left-0 z-10 ${i % 2 === 0 ? "bg-surface" : "bg-[#111827]"}`}>
                                            {row.feature}
                                        </td>
                                        {row.tools.map((val, j) => (
                                            <td key={j} className="p-4 text-center">
                                                <ComparisonBadge value={val} />
                                            </td>
                                        ))}
                                        <td className={`p-4 text-center border-l-2 border-primary-brand/30 sticky right-0 z-10 ${i % 2 === 0 ? "bg-green-500/10" : "bg-green-500/5"}`}>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 font-semibold text-xs">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                {row.purplehub}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary stats */}
                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {[
                            { num: "20/20", label: "Features Available" },
                            { num: "100%", label: "AI-Powered Capabilities" },
                            { num: "0", label: "Features Unavailable" },
                            { num: "#1", label: "Across All Categories" },
                        ].map((stat) => (
                            <StaggerItem key={stat.label}>
                                <div className="text-center p-6 rounded-2xl bg-primary-dark/40 border border-border">
                                    <p className="text-2xl lg:text-3xl font-bold gradient-text font-heading">{stat.num}</p>
                                    <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section >

            {/* FEATURE GRID */}
            < section id="features" className="py-24 lg:py-32" >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16">
                        <p className="section-label">CAPABILITIES</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                            Everything you need for{" "}
                            <span className="gradient-text">modern performance</span>
                        </h2>
                    </ScrollReveal>

                    <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <StaggerItem key={feature.title}>
                                <div className="interactive-card group h-full flex flex-col items-start gap-5 p-8">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center card-icon transition-all duration-400 shadow-lg`}>
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white font-heading">
                                        {feature.title}
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section >

            {/* HOW IT WORKS - TIMELINE */}
            < TimelineSection />

            {/* TECH STACK */}
            < section id="tech-stack" className="py-24 lg:py-32 bg-primary-dark relative overflow-hidden" >
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16">
                        <p className="section-label">INFRASTRUCTURE</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                            Built for Enterprise Scale
                        </h2>
                        <p className="mt-4 text-lg text-green-200/60 max-w-2xl mx-auto">
                            Enterprise-grade security and reliability you can count on
                        </p>
                    </ScrollReveal>

                    <StaggerContainer staggerDelay={0.12} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {techCapabilities.map((cap) => (
                            <StaggerItem key={cap.label}>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 hover:border-primary-brand/30 transition-all duration-400 group">
                                    <cap.icon className="w-10 h-10 text-primary-brand mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                    <p className="font-heading font-semibold text-white">{cap.label}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section >

            {/* INTEGRATIONS */}
            < section className="py-24 lg:py-32 bg-surface" >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16">
                        <p className="section-label">INTEGRATIONS</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                            Works with your <span className="gradient-text">existing tools</span>
                        </h2>
                    </ScrollReveal>

                    <StaggerContainer staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {integrations.map((name) => (
                            <StaggerItem key={name}>
                                <div className="interactive-card flex items-center justify-center gap-3 p-5 text-center">
                                    <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-xs font-bold text-primary-brand font-heading">
                                        {name[0]}
                                    </div>
                                    <span className="text-sm font-medium text-text-primary">{name}</span>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <ScrollReveal delay={0.3} className="text-center mt-8">
                        <p className="text-text-secondary">
                            And <span className="font-semibold text-primary-brand">50+</span> more integrations
                        </p>
                    </ScrollReveal>
                </div>
            </section >

            {/* CTA */}
            < section className="py-24 lg:py-32" >
                <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                            See it in action
                        </h2>
                        <p className="text-lg text-text-secondary mb-10">
                            Schedule a personalized demo and see how PurpleHub can transform
                            your organization&apos;s performance management.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-10 py-4 bg-primary-brand text-white rounded-2xl font-semibold text-lg hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1"
                        >
                            Request Demo <ArrowRight className="w-5 h-5" />
                        </Link>
                    </ScrollReveal>
                </div>
            </section >
        </>
    );
}
