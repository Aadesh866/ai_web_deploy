"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  UserCog,
  History,
  Scale,
  FileText,
  TrendingDown,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  ChevronRight,
  Sparkles,
  Quote,
  Zap,
  Target,
  Brain,
  HelpCircle,
  Gamepad2,
  Database,
  Users,
  Handshake,
  Eye,
  Award,
  Settings,
  UserCheck,
  ClipboardList,
  TrendingUp,
  Trophy,
  LayoutGrid,
} from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import {
  ParticleField,
  AnimatedCounter,
  NetworkVisualization,
  LogoMarquee,
} from "@/components/HomeVisuals";

// Hero headline with word-by-word stagger animation
function HeroHeadline() {
  const words = "Your best performers don't need to be the loudest. They need to be seen.".split(" ");
  return (
    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-5xl">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className={`inline-block ${i < words.length - 1 ? "mr-[0.3em]" : ""}`}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

// CEO Questions data (from brochure 001)
const ceoQuestions = [
  "Do our performance systems help leaders make confident talent decisions, or do they mainly focus on documentation?",
  "Would managers voluntarily use the system if compliance wasn't enforced?",
  "After a full cycle, can HR confidently say behaviour or capability has improved?",
  "Does feedback reach employees when behaviour can still change, or weeks/months later?",
  "Can employees clearly see how their contribution translates into outcomes?",
  "After a full cycle, can HR confidently say capability has improved?",
];

// Salient Features data (from brochure 003)
const salientFeatures = [
  { icon: Gamepad2, num: "01", title: "Real-time, gamified platform", description: "Engage employees with live performance tracking and gamified elements that make growth visible and rewarding" },
  { icon: Database, num: "02", title: "Quantifiable, unbiased, data-driven", description: "Remove subjective bias with AI-powered analytics that deliver objective performance insights" },
  { icon: Users, num: "03", title: "Dynamic and inclusive", description: "Adapt to every team structure — cross-functional, remote, matrix — ensuring nobody falls through the cracks" },
  { icon: Handshake, num: "04", title: "Trust, transparency & accountability", description: "Build a culture where ratings are earned openly, not negotiated behind closed doors" },
  { icon: Eye, num: "05", title: "Identify and nurture top talent", description: "Spot high performers early and create growth paths — something that matters most" },
];

// How It Works cycle (from brochure 003)
const howItWorks = [
  { icon: ClipboardList, num: "01", title: "Role-related tasks", description: "Define and track meaningful work aligned to each role" },
  { icon: Settings, num: "02", title: "Self check & seeking inputs", description: "Employees self-assess and proactively seek stakeholder feedback" },
  { icon: UserCheck, num: "03", title: "Key stakeholders feedback", description: "Multi-rater input from peers, leads, and cross-functional partners" },
  { icon: TrendingUp, num: "04", title: "Accumulation of scores", description: "Continuous aggregation of performance data points" },
  { icon: Trophy, num: "05", title: "Score boarding", description: "Real-time leaderboards that celebrate contribution transparently" },
  { icon: LayoutGrid, num: "06", title: "Consolidation of scores", description: "Holistic performance view combining all data into actionable insights" },
];

const problemCards = [
  {
    icon: UserCog,
    title: "Leadership Bias",
    description: "Individual styles distort culture and create inconsistent standards",
  },
  {
    icon: History,
    title: "Backward-Looking",
    description: "Annual reviews dissect the past instead of shaping the future",
  },
  {
    icon: Scale,
    title: "Perceived Unfairness",
    description: "Employees experience evaluations as ad hoc and opaque",
  },
  {
    icon: FileText,
    title: "Compliance Burden",
    description: "Performed as a ritual, not a strategic growth tool",
  },
  {
    icon: TrendingDown,
    title: "Declining Relevance",
    description: "Losing credibility as work evolves beyond hierarchies",
  },
];

const platformCards = [
  {
    icon: MessageSquare,
    title: "Real-Time Feedback",
    description: "Reach employees when behavior can still change, not weeks later",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Clarity",
    description: "Clear rationale for ratings backed by intelligence, not manager memory",
  },
  {
    icon: ShieldCheck,
    title: "Confident Decisions",
    description: "Leaders make talent decisions with certainty, not just documentation",
  },
];

const stats = [
  { value: "90", suffix: "%", label: "of HRMS platforms treat performance as an afterthought" },
  { value: "55", suffix: "%", label: "average feature adoption in traditional systems" },
  { value: "3", suffix: "x", label: "more likely to improve with continuous feedback" },
  { value: "40", suffix: "%", label: "reduction in manager bias with AI assistance" },
];

function AutoPlayVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) {
          video.muted = false;
          video.play().catch(() => {
            video.muted = true;
            video.play().catch(() => { });
          });
          setShowControls(false);
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [userPaused]);

  const handleClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      setShowControls(false);
      video.play().catch(() => { });
    } else {
      setUserPaused(true);
      setShowControls(true);
      video.pause();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full rounded-2xl border border-border shadow-2xl shadow-green-500/10 cursor-pointer"
      controls={showControls}
      playsInline
      preload="metadata"
      onClick={handleClick}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient">
        <ParticleField />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm text-green-200 mb-8"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Performance Intelligence
            </motion.div>

            <HeroHeadline />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 text-lg sm:text-xl text-green-200/80 max-w-2xl mx-auto leading-relaxed"
            >
              Real-time visibility into who did what, how they performed, and why it matters — so introverts don&apos;t have to shout to be recognized
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-brand text-white rounded-2xl font-semibold text-base hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1"
              >
                Get a Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#name-story"
                className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="w-4 h-4" />
                Watch Video
              </Link>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-green-500/10"
          >
            <Image
              src="/brochure-hero.jpg"
              alt="PurpleHub — AI-Powered Performance Intelligence"
              width={1400}
              height={800}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent" />
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ============================================ */}
      {/* LOGO BAR */}
      {/* ============================================ */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-center text-sm text-text-secondary font-medium mb-6">
              Trusted by forward-thinking organizations
            </p>
          </ScrollReveal>
          <LogoMarquee />
        </div>
      </section>

      {/* ============================================ */}
      {/* OUR NAME STORY (moved up) */}
      {/* ============================================ */}
      <section id="name-story" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Video */}
            <ScrollReveal>
              <div className="relative">
                <AutoPlayVideo src="/purplehub-name-story.mp4" />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-brand/10 via-secondary/5 to-primary-brand/10 rounded-3xl blur-3xl -z-10" />
              </div>
            </ScrollReveal>

            {/* Right: Story Content */}
            <ScrollReveal delay={0.2}>
              <p className="section-label">OUR NAME STORY</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Why <span className="gradient-text">PurpleHub</span>?
              </h2>
              <div className="space-y-5 text-text-secondary leading-relaxed">
                <p>
                  It started with a simple belief: <span className="text-white font-medium">people matter</span>.
                  Not as resources. Not as headcount. As human beings with
                  dreams, drive, and purpose.
                </p>
                <p>
                  When someone discovers their <span className="text-primary-brand font-semibold">purpose</span> and
                  pursues it with <span className="text-primary-brand font-semibold">passion</span>,
                  something magical happens — time vanishes, effort feels effortless,
                  and the work stops feeling like work. Pain melts away. Flow takes over.
                </p>
                <p>
                  PurpleHub was born to unlock that feeling at scale — to help
                  organizations see their people clearly, celebrate their
                  contributions honestly, and create environments where
                  purpose-driven work thrives.
                </p>
              </div>
              <p className="mt-6 text-sm text-text-secondary italic border-l-2 border-primary-brand pl-4">
                For.. people matter
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CEO QUESTIONS (from brochure 001) */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label">THE REAL QUESTION</p>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto">
              Do you have <span className="gradient-text">real-time visibility</span> into top performers?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Every CEO should be asking these questions. If you can&apos;t answer them confidently, your performance system is failing you.
            </p>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ceoQuestions.map((question, i) => (
              <StaggerItem key={i}>
                <div className="interactive-card group h-full p-8 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-900/40 to-blue-900/40 flex items-center justify-center flex-shrink-0 mt-1">
                    <HelpCircle className="w-5 h-5 text-primary-brand" />
                  </div>
                  <p className="text-text-primary leading-relaxed font-medium">
                    {question}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================ */}
      {/* INDUSTRY PROBLEM & GAP (from brochure 002) */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label">THE PROBLEM</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Legacy systems weren&apos;t built for{" "}
              <span className="gradient-text">modern work</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* What we have today */}
            <ScrollReveal>
              <div className="interactive-card p-8 h-full">
                <h3 className="text-xl font-bold text-white font-heading mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-text-secondary" />
                  What we have today
                </h3>
                <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                  <li>• 90% of HRMS platforms are end-to-end with performance as an add-on</li>
                  <li>• Focus on onboarding, payroll, compliance — performance is an afterthought</li>
                  <li>• Hosts of features leading to just 50–60% usage</li>
                  <li>• Similar workflow/form-based solutions with minimal impact</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* The problem is growing */}
            <ScrollReveal delay={0.15}>
              <div className="interactive-card p-8 h-full border-primary-brand/30">
                <h3 className="text-xl font-bold text-white font-heading mb-4 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  The problem is growing
                </h3>
                <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                  <li>• Organizations are structurally fluid and cross-functional</li>
                  <li>• Driven by rapid innovation and deep-tech roles</li>
                  <li>• Individual impact spans teams, geographies, and processes</li>
                  <li>• A single manager can&apos;t evaluate performance holistically — it&apos;s unrealistic and unfair</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* The gap we see */}
            <ScrollReveal delay={0.3}>
              <div className="interactive-card p-8 h-full">
                <h3 className="text-xl font-bold text-white font-heading mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  The gap we see
                </h3>
                <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                  <li>• No differentiated model to strengthen the process</li>
                  <li>• Leadership styles distort culture and outcomes</li>
                  <li>• Evaluation is dissection of the past, not shaping the future</li>
                  <li>• People perceive it as unfair, ad hoc — slowly losing relevance</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Problem cards */}
          <StaggerContainer
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {problemCards.map((card, i) => (
              <StaggerItem
                key={card.title}
                className={i >= 3 ? "lg:col-span-1 lg:mx-auto lg:max-w-md" : ""}
              >
                <div className="interactive-card group h-full flex flex-col items-start gap-4 p-8">
                  <div className="w-14 h-14 rounded-2xl bg-green-900/30 flex items-center justify-center card-icon transition-all duration-400">
                    <card.icon className="w-7 h-7 text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================ */}
      {/* SALIENT FEATURES - Animated Timeline (from brochure 003) */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-20">
            <p className="section-label">SALIENT FEATURES</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              A performance management system that&apos;s{" "}
              <span className="gradient-text">different</span>
            </h2>
          </ScrollReveal>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-brand/50 via-secondary/30 to-primary-brand/50 -translate-x-1/2 hidden lg:block" />

            <div className="space-y-16 lg:space-y-0">
              {salientFeatures.map((feature, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={feature.num} className="relative lg:mb-24 last:lg:mb-0">
                    {/* Center Circle with Number */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
                      className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 items-center justify-center shadow-xl shadow-green-500/30 border-4 border-background"
                    >
                      <span className="text-white font-bold text-lg font-heading">{i + 1}</span>
                    </motion.div>

                    {/* Content Card - alternating sides */}
                    <div className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center`}>
                      {/* Left side */}
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? -60 : 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                        className={`${isLeft ? '' : 'hidden lg:block'}`}
                      >
                        {isLeft ? (
                          <div className="interactive-card group p-8 lg:text-right">
                            <div className="flex items-center gap-3 lg:justify-end mb-4">
                              <div className="lg:hidden w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold font-heading">{i + 1}</span>
                              </div>
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-900/40 to-blue-900/40 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/10 transition-all duration-300">
                                <feature.icon className="w-6 h-6 text-primary-brand" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-white font-heading mb-3">{feature.title}</h3>
                            <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                          </div>
                        ) : (
                          <div />
                        )}
                      </motion.div>

                      {/* Right side */}
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? 0 : 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                        className={`${!isLeft ? '' : 'hidden lg:block'}`}
                      >
                        {!isLeft ? (
                          <div className="interactive-card group p-8">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="lg:hidden w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold font-heading">{i + 1}</span>
                              </div>
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-900/40 to-blue-900/40 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/10 transition-all duration-300">
                                <feature.icon className="w-6 h-6 text-primary-brand" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-white font-heading mb-3">{feature.title}</h3>
                            <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                          </div>
                        ) : (
                          <div />
                        )}
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW DOES IT WORK? (from brochure 003) */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label">THE PROCESS</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              How does it <span className="gradient-text">work</span>?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <motion.div
                  className="interactive-card group p-8 h-full relative overflow-hidden"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  {/* Step number watermark */}
                  <span className="absolute top-4 right-6 text-6xl font-bold text-white/5 font-heading">{step.num}</span>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-900/40 to-blue-900/40 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-green-500/10 transition-all duration-300">
                      <step.icon className="w-7 h-7 text-primary-brand" />
                    </div>
                    <p className="text-xs font-mono text-primary-brand font-bold mb-2">STEP {step.num}</p>
                    <h3 className="text-lg font-bold text-white font-heading mb-2">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                  {/* Connector line for flow */}
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-primary-brand/40 to-transparent z-20" />
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE SHIFT SECTION */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <ScrollReveal>
              <p className="section-label">THE SHIFT</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
                Work has changed.{" "}
                <span className="gradient-text">Has your performance system?</span>
              </h2>
              <div className="space-y-5 mb-8">
                {[
                  "Structurally fluid and cross-functional",
                  "Driven by rapid innovation and deep-tech roles",
                  "Interconnected impact across teams and geographies",
                ].map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary-brand flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-text-primary">{point}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm">
                <p className="text-text-secondary leading-relaxed italic">
                  &ldquo;Expecting a single manager to evaluate performance
                  holistically is unrealistic—and unfair.&rdquo;
                </p>
              </div>
            </ScrollReveal>

            {/* Right Visualization */}
            <ScrollReveal delay={0.3}>
              <NetworkVisualization />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PLATFORM PREVIEW */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label">THE PLATFORM</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Finally, answers to the{" "}
              <span className="gradient-text">hard questions</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformCards.map((card) => (
              <StaggerItem key={card.title}>
                <div className="interactive-card group h-full flex flex-col items-start gap-5 p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-900/30 to-blue-900/30 flex items-center justify-center card-icon transition-all duration-400">
                    <card.icon className="w-8 h-8 text-primary-brand" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <Link
                    href="/platform"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary-brand hover:gap-2 transition-all duration-300"
                  >
                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>



      {/* ============================================ */}
      {/* THE DIFFERENCE SECTION */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <p className="section-label">THE DIFFERENCE</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Not Another{" "}
                <span className="gradient-text">HRMS Add-On</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                While others extend 50+ features you&apos;ll never use, we focus
                exclusively on performance intelligence.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                90% of HRMS platforms prioritize onboarding, payroll and
                compliance—performance is just an afterthought. Organizations
                typically use only 50-60% of system capabilities. We built
                something different: intelligent, continuous performance
                management that people actually adopt.
              </p>
              <Link
                href="/platform"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-brand text-white rounded-2xl font-semibold text-base hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1"
              >
                See the Platform
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: Zap,
                    title: "Purpose-Built",
                    description: "Engineered exclusively for performance—not bolted onto payroll",
                    gradient: "from-amber-500 to-orange-500",
                  },
                  {
                    icon: Brain,
                    title: "AI-Native",
                    description: "Intelligence woven into every interaction, not an add-on layer",
                    gradient: "from-purple-500 to-violet-500",
                  },
                  {
                    icon: Target,
                    title: "High Adoption",
                    description: "90%+ adoption rates because it fits how people actually work",
                    gradient: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: MessageSquare,
                    title: "Continuous",
                    description: "Real-time feedback loops, not once-a-year review ceremonies",
                    gradient: "from-blue-500 to-cyan-500",
                  },
                ].map((item) => (
                  <div key={item.title} className="interactive-card group p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 card-icon transition-all duration-400 shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* GOING BEYOND VISIBILITY - Second Video */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <ScrollReveal>
              <p className="section-label">GOING BEYOND</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Going Beyond <span className="gradient-text">Visibility</span>
              </h2>
              <div className="space-y-5 text-text-secondary leading-relaxed">
                <p>
                  Performance isn&apos;t just about what gets measured — it&apos;s about what gets <span className="text-white font-medium">understood</span>.
                </p>
                <p>
                  PurpleHub goes beyond simple dashboards and scorecards. We surface the <span className="text-primary-brand font-semibold">stories behind the numbers</span> —
                  the quiet contributor who bridges three teams, the deep-tech specialist whose impact ripples across the entire organization.
                </p>
                <p>
                  When visibility becomes <span className="text-primary-brand font-semibold">insight</span>,
                  leaders make better decisions, employees feel truly seen,
                  and organizations unlock potential they never knew existed.
                </p>
              </div>
            </ScrollReveal>

            {/* Right: Video */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <AutoPlayVideo src="/purplehub-beyond-visibility.mp4" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-secondary/5 to-green-500/10 rounded-3xl blur-3xl -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-brand font-heading mb-3">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[200px] mx-auto">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIAL */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32 bg-green-900/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <Quote className="w-16 h-16 text-primary-brand/20 mx-auto mb-8" />
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white leading-snug mb-8">
              &ldquo;For the first time, we can see performance clearly across
              our matrix organization without relying on a single manager&apos;s
              perspective.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-brand to-secondary flex items-center justify-center text-white font-bold">
                JC
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Jessica Chen</p>
                <p className="text-sm text-text-secondary">
                  VP of People, TechCorp Inc.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="relative py-24 lg:py-32 bg-primary-dark overflow-hidden">
        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Turn the page on broken performance management
            </h2>
            <p className="text-lg text-green-200/70 mb-10">
              If you believe these questions deserve clear answers, let&apos;s
              talk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your work email"
                className="w-full sm:flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary-brand focus:ring-2 focus:ring-primary-brand/30 backdrop-blur-sm transition-all"
              />
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-primary-brand text-white rounded-2xl font-semibold hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1 text-center"
              >
                Get Started
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
