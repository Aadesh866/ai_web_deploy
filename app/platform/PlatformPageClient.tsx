"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

function TimelineSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 lg:py-32" ref={ref}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <ScrollReveal className="text-center mb-16">
                    <p className="section-label">HOW IT WORKS</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                        From chaos to <span className="gradient-text">clarity</span> in 4 steps
                    </h2>
                </ScrollReveal>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary-brand to-secondary"
                            initial={{ width: "0%" }}
                            animate={isInView ? { width: "100%" } : {}}
                            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5 + i * 0.3, duration: 0.6 }}
                                className="text-center"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-surface border-2 border-border shadow-lg mx-auto mb-6 flex items-center justify-center group hover:border-primary-brand hover:shadow-xl hover:shadow-green-500/10 transition-all duration-400">
                                    <step.icon className="w-8 h-8 text-primary-brand" />
                                </div>
                                <p className="text-xs font-mono text-primary-brand font-bold mb-2">{step.num}</p>
                                <h3 className="text-xl font-bold text-white font-heading mb-2">{step.title}</h3>
                                <p className="text-text-secondary text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
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

            {/* FEATURE GRID */}
            <section id="features" className="py-24 lg:py-32">
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
            </section>

            {/* HOW IT WORKS - TIMELINE */}
            <TimelineSection />

            {/* TECH STACK */}
            <section id="tech-stack" className="py-24 lg:py-32 bg-primary-dark relative overflow-hidden">
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
            </section>

            {/* INTEGRATIONS */}
            <section className="py-24 lg:py-32 bg-surface">
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
            </section>

            {/* CTA */}
            <section className="py-24 lg:py-32">
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
            </section>
        </>
    );
}
