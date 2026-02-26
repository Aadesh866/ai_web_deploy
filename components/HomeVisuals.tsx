"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Simple seeded PRNG (mulberry32) — deterministic across server & client
function seededRandom(seed: number) {
    let t = (seed + 0x6d2b79f5) | 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Animated particles background for hero
export function ParticleField() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => {
                const r1 = seededRandom(i * 4 + 1);
                const r2 = seededRandom(i * 4 + 2);
                const r3 = seededRandom(i * 4 + 3);
                const r4 = seededRandom(i * 4 + 4);
                return (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-primary-brand/30"
                        style={{
                            left: `${r1 * 100}%`,
                            top: `${r2 * 100}%`,
                            animation: `pulse-dot ${3 + r3 * 4}s ease-in-out infinite`,
                            animationDelay: `${r4 * 5}s`,
                        }}
                    />
                );
            })}
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {Array.from({ length: 12 }).map((_, i) => {
                    const base = 200 + i * 4;
                    return (
                        <line
                            key={i}
                            x1={`${10 + seededRandom(base) * 80}%`}
                            y1={`${10 + seededRandom(base + 1) * 80}%`}
                            x2={`${10 + seededRandom(base + 2) * 80}%`}
                            y2={`${10 + seededRandom(base + 3) * 80}%`}
                            stroke="url(#lineGrad)"
                            strokeWidth="1"
                        />
                    );
                })}
            </svg>
        </div>
    );
}

// CSS-based Dashboard Mockup
export function DashboardMockup() {
    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div
                className="relative bg-surface rounded-2xl shadow-2xl shadow-green-500/10 border border-border overflow-hidden"
                style={{ transform: "perspective(1200px) rotateY(-2deg) rotateX(3deg)" }}
            >
                {/* Title Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-primary-dark border-b border-border">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="px-4 py-1 bg-surface rounded-md text-xs text-text-secondary border border-border">
                            app.purplehub.ai/dashboard
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 grid grid-cols-12 gap-4">
                    {/* Sidebar */}
                    <div className="col-span-2 flex flex-col gap-3">
                        <div className="w-full h-8 rounded-lg bg-primary-brand/10 flex items-center justify-center">
                            <div className="w-4 h-4 rounded bg-primary-brand/40" />
                        </div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-full h-6 rounded-md ${i === 0 ? 'bg-primary-brand/15' : 'bg-surface'}`} />
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="col-span-10 space-y-4">
                        {/* Top Stats Row */}
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { label: "Team Score", value: "87%", color: "from-primary-brand to-secondary" },
                                { label: "Feedback", value: "324", color: "from-green-400 to-emerald-500" },
                                { label: "Reviews", value: "42", color: "from-accent-warm to-amber-400" },
                                { label: "Insights", value: "18", color: "from-purple-400 to-violet-500" },
                            ].map((stat) => (
                                <div key={stat.label} className="p-3 rounded-xl bg-primary-dark border border-border shadow-sm">
                                    <p className="text-[10px] text-text-secondary mb-1">{stat.label}</p>
                                    <p className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Line Chart */}
                            <div className="p-4 rounded-xl bg-primary-dark border border-border shadow-sm">
                                <p className="text-xs font-semibold text-text-primary mb-3">Performance Trend</p>
                                <div className="h-24 flex items-end gap-1">
                                    {[40, 55, 45, 60, 70, 65, 80, 75, 85, 90, 82, 95].map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-t-sm bg-gradient-to-t from-primary-brand to-secondary opacity-80"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Circular Progress */}
                            <div className="p-4 rounded-xl bg-primary-dark border border-border shadow-sm">
                                <p className="text-xs font-semibold text-text-primary mb-3">AI Insights</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 relative">
                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                            <path
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="#334155"
                                                strokeWidth="2.5"
                                            />
                                            <path
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="#22C55E"
                                                strokeWidth="2.5"
                                                strokeDasharray="78, 100"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-sm font-bold text-primary-brand">78%</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        {["Bias Detected", "Risk Flagged", "Growth Ready"].map((label, i) => (
                                            <div key={label} className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${['bg-red-400', 'bg-yellow-400', 'bg-green-400'][i]}`} />
                                                <span className="text-[10px] text-text-secondary">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback Timeline */}
                        <div className="p-4 rounded-xl bg-primary-dark border border-border shadow-sm">
                            <p className="text-xs font-semibold text-text-primary mb-3">Recent Feedback</p>
                            <div className="space-y-2">
                                {[
                                    { name: "Sarah K.", msg: "Excellent cross-team collaboration on Q4 launch", time: "2h ago" },
                                    { name: "Marcus T.", msg: "Great mentoring of new team members", time: "5h ago" },
                                    { name: "AI Insight", msg: "Pattern: Strong leadership skills emerging", time: "1d ago" },
                                ].map((item) => (
                                    <div key={item.name} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-brand to-secondary flex items-center justify-center text-white text-[8px] font-bold">
                                            {item.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-medium text-text-primary truncate">{item.msg}</p>
                                            <p className="text-[8px] text-text-secondary">{item.name} · {item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Glow effect behind dashboard */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-brand/20 via-secondary/10 to-primary-brand/20 rounded-3xl blur-3xl -z-10" />
        </div>
    );
}

// Counter animation component
export function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: string; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        const duration = 2000;
                        const steps = 60;
                        const stepValue = numericValue / steps;
                        let current = 0;
                        const interval = setInterval(() => {
                            current += stepValue;
                            if (current >= numericValue) {
                                setCount(numericValue);
                                clearInterval(interval);
                            } else {
                                setCount(Math.floor(current));
                            }
                        }, duration / steps);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [numericValue, hasAnimated]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{count}{suffix}
        </span>
    );
}

// Network visualization for The Shift section
export function NetworkVisualization() {
    const nodes = [
        { x: 50, y: 30, size: 16, label: "HR" },
        { x: 20, y: 50, size: 12, label: "Eng" },
        { x: 80, y: 50, size: 12, label: "Sales" },
        { x: 35, y: 75, size: 10, label: "Design" },
        { x: 65, y: 75, size: 10, label: "Ops" },
        { x: 50, y: 55, size: 14, label: "AI" },
        { x: 15, y: 30, size: 8 },
        { x: 85, y: 30, size: 8 },
        { x: 10, y: 70, size: 6 },
        { x: 90, y: 70, size: 6 },
    ];

    const connections = [
        [0, 1], [0, 2], [0, 5], [1, 3], [2, 4], [3, 5], [4, 5],
        [1, 5], [2, 5], [0, 6], [0, 7], [1, 8], [2, 9], [3, 4],
    ];

    return (
        <div className="relative w-full aspect-square max-w-lg mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                    </linearGradient>
                    <radialGradient id="nodeGrad">
                        <stop offset="0%" stopColor="#22C55E" />
                        <stop offset="100%" stopColor="#3B82F6" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Connections */}
                {connections.map(([from, to], i) => (
                    <line
                        key={i}
                        x1={nodes[from].x}
                        y1={nodes[from].y}
                        x2={nodes[to].x}
                        y2={nodes[to].y}
                        stroke="url(#connGrad)"
                        strokeWidth="0.5"
                    >
                        <animate
                            attributeName="opacity"
                            values="0.3;0.8;0.3"
                            dur={`${3 + i * 0.3}s`}
                            repeatCount="indefinite"
                        />
                    </line>
                ))}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <g key={i} filter="url(#glow)">
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.size / 4}
                            fill="url(#nodeGrad)"
                            opacity="0.9"
                        >
                            <animate
                                attributeName="r"
                                values={`${node.size / 4};${node.size / 3.5};${node.size / 4}`}
                                dur={`${2 + i * 0.5}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                        {node.label && (
                            <text
                                x={node.x}
                                y={node.y + node.size / 2 + 4}
                                textAnchor="middle"
                                className="text-[3px] font-medium"
                                fill="#94A3B8"
                            >
                                {node.label}
                            </text>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}

// Logo Marquee
export function LogoMarquee() {
    const logos = [
        "TechCorp", "InnovateCo", "ScaleUp", "FutureWork", "NextGen",
        "DataFlow", "CloudPeak", "SynapseAI", "Quantum HR", "VeloCity",
        "GrowthOS", "TalentHub",
    ];

    return (
        <div className="relative overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex gap-16 animate-marquee">
                {[...logos, ...logos].map((logo, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 px-6 py-3 grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100"
                    >
                        <div className="flex items-center gap-2 text-text-secondary font-heading font-semibold text-lg whitespace-nowrap">
                            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-xs font-bold text-primary-brand">
                                {logo[0]}
                            </div>
                            {logo}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
