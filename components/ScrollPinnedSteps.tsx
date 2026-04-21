"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Step {
    icon: React.ComponentType<{ className?: string }>;
    num: string;
    title: string;
    description: string;
}

export default function ScrollPinnedSteps({ steps }: { steps: Step[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            style={{ height: `${(steps.length + 1) * 200}vh` }}
            className="relative"
        >
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 lg:px-8 w-full">
                    {/* Progress bar */}
                    <div className="absolute left-1/2 top-[20%] bottom-[20%] w-[2px] bg-border -translate-x-1/2 hidden lg:block">
                        <motion.div
                            className="w-full bg-gradient-to-b from-green-500 to-blue-500 origin-top"
                            style={{ scaleY: scrollYProgress, height: "100%" }}
                        />
                    </div>

                    {/* Steps */}
                    <div className="relative z-10 space-y-0">
                        {steps.map((step, i) => (
                            <StepItem
                                key={step.num}
                                step={step}
                                index={i}
                                total={steps.length}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepItem({
    step,
    index,
    total,
    scrollYProgress,
}: {
    step: Step;
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    // Each step activates at (index / total) to ((index+1) / total) of scroll progress
    const start = index / total;
    const end = (index + 0.5) / total;

    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    const y = useTransform(scrollYProgress, [start, end], [40, 0]);
    const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);

    const isLeft = index % 2 === 0;

    return (
        <motion.div
            style={{ opacity, y, scale }}
            className="py-4 lg:py-6"
        >
            <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
                {/* Left side */}
                <div className={isLeft ? "" : "hidden lg:block"}>
                    {isLeft ? (
                        <div className="p-6 rounded-2xl bg-surface/80 border border-border backdrop-blur-sm lg:text-right">
                            <div className="flex items-center gap-3 lg:justify-end mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                                    <span className="text-white font-bold font-heading">{index + 1}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-900/40 to-blue-900/40 flex items-center justify-center">
                                    <step.icon className="w-5 h-5 text-primary-brand" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white font-heading mb-2">{step.title}</h3>
                            <p className="text-text-secondary leading-relaxed text-sm">{step.description}</p>
                        </div>
                    ) : (
                        <div />
                    )}
                </div>

                {/* Right side */}
                <div className={!isLeft ? "" : "hidden lg:block"}>
                    {!isLeft ? (
                        <div className="p-6 rounded-2xl bg-surface/80 border border-border backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                                    <span className="text-white font-bold font-heading">{index + 1}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-900/40 to-blue-900/40 flex items-center justify-center">
                                    <step.icon className="w-5 h-5 text-primary-brand" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white font-heading mb-2">{step.title}</h3>
                            <p className="text-text-secondary leading-relaxed text-sm">{step.description}</p>
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </motion.div>
    );
}
