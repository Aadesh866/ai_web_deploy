"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
} from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import {
  ParticleField,
  DashboardMockup,
  AnimatedCounter,
  NetworkVisualization,
  LogoMarquee,
} from "@/components/HomeVisuals";

// Hero headline with word-by-word stagger animation
function HeroHeadline() {
  const words = "Can your employees clearly see how contribution translates into outcomes?".split(" ");
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
              The performance intelligence platform built for how work actually
              happens today
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
              <button className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                <Play className="w-4 h-4" />
                Watch Video
              </button>
            </motion.div>
          </div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="floating"
          >
            <DashboardMockup />
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
      {/* PROBLEM SECTION */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label">THE PROBLEM</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Legacy systems weren't built for{" "}
              <span className="gradient-text">modern work</span>
            </h2>
          </ScrollReveal>

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
      <section className="py-24 lg:py-32 bg-surface">
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
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32 bg-surface">
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
      {/* OUR NAME STORY */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Video */}
            <ScrollReveal>
              <div className="relative">
                <video
                  className="w-full rounded-2xl border border-border shadow-2xl shadow-green-500/10"
                  controls
                  playsInline
                  preload="metadata"
                  poster=""
                >
                  <source src="/purplehub-name-story.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Glow behind video */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-brand/10 via-secondary/5 to-primary-brand/10 rounded-3xl blur-3xl -z-10" />
              </div>
            </ScrollReveal>

            {/* Right: Story Content */}
            <ScrollReveal delay={0.2}>
              <p className="section-label">OUR NAME STORY</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Why <span className="gradient-text">Purple Hub</span>?
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
                  Purple Hub was born to unlock that feeling at scale — to help
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
