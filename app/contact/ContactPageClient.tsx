"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Calendar,
    MessageCircle,
    ChevronDown,
    Mail,
    Phone,
    MapPin,
    Twitter,
    Linkedin,
    Sparkles,
} from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const jobTitles = [
    "Select your role",
    "CHRO / Chief People Officer",
    "VP of HR / People Operations",
    "Director of HR",
    "HR Manager",
    "Other",
];

const teamSizes = [
    "Select team size",
    "50 - 200 employees",
    "201 - 1,000 employees",
    "1,001 - 5,000 employees",
    "5,000+ employees",
];

const faqs = [
    {
        question: "How long does implementation take?",
        answer: "Typical implementation takes 4-8 weeks depending on your organization's size and complexity. We provide dedicated onboarding support, data migration assistance, and training for HR teams and managers throughout the process.",
    },
    {
        question: "Can you integrate with our existing HRIS?",
        answer: "Yes! PurpleHub integrates with 50+ HRIS and productivity tools including Workday, BambooHR, SAP SuccessFactors, ADP, Slack, Microsoft Teams, and more. Our API also supports custom integrations.",
    },
    {
        question: "How do you handle data security?",
        answer: "We take security seriously. PurpleHub is SOC 2 Type II certified, GDPR compliant, and ISO 27001 certified. All data is encrypted at rest and in transit. We offer single-tenant deployment options for enterprise clients.",
    },
    {
        question: "What's the pricing model?",
        answer: "PurpleHub uses a per-employee-per-month pricing model with volume discounts. We offer Starter, Professional, and Enterprise tiers. Contact us for a custom quote based on your team size and needs.",
    },
    {
        question: "Do you offer change management support?",
        answer: "Absolutely. Our Customer Success team includes change management specialists who help with communication plans, manager training, employee onboarding, and adoption tracking to ensure a smooth transition.",
    },
    {
        question: "Is there a minimum team size?",
        answer: "PurpleHub is designed for organizations with 50+ employees. For teams of 50-200, our Starter plan provides all core features. Larger organizations benefit from our Professional and Enterprise plans with advanced analytics and customization.",
    },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-brand/30">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-colors"
                aria-expanded={isOpen}
            >
                <span className="text-base font-heading font-bold text-white pr-4">{faq.question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-text-secondary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ContactPageClient() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        jobTitle: "",
        teamSize: "",
        message: "",
        newsletter: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // In production, this would send to an API
    };

    const inputClasses =
        "w-full px-5 py-3.5 rounded-xl border border-border text-text-primary bg-surface placeholder-text-secondary/50 focus:outline-none focus:border-primary-brand focus:ring-2 focus:ring-primary-brand/20 transition-all font-[var(--font-body)]";

    return (
        <>
            {/* HERO */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-dark via-green-900 to-primary-dark overflow-hidden">
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
                        Contact
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                    >
                        Let&apos;s Build Better Performance{" "}
                        <span className="bg-gradient-to-r from-primary-brand to-secondary bg-clip-text text-transparent">
                            Together
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-lg text-green-200/80 max-w-2xl mx-auto"
                    >
                        Ready to transform how your organization approaches talent?
                    </motion.p>
                </div>
            </section>

            {/* CONTACT FORM + SIDEBAR */}
            <section className="py-24 lg:py-32">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <ScrollReveal>
                                <AnimatePresence mode="wait">
                                    {!isSubmitted ? (
                                        <motion.form
                                            key="form"
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className={inputClasses}
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                                                        Work Email *
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className={inputClasses}
                                                        placeholder="john@company.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
                                                        Company Name *
                                                    </label>
                                                    <input
                                                        id="company"
                                                        type="text"
                                                        required
                                                        value={formData.company}
                                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                        className={inputClasses}
                                                        placeholder="Acme Inc."
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="jobTitle" className="block text-sm font-medium text-text-primary mb-2">
                                                        Job Title *
                                                    </label>
                                                    <select
                                                        id="jobTitle"
                                                        required
                                                        value={formData.jobTitle}
                                                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                                        className={inputClasses}
                                                    >
                                                        {jobTitles.map((title) => (
                                                            <option key={title} value={title === "Select your role" ? "" : title}>
                                                                {title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="teamSize" className="block text-sm font-medium text-text-primary mb-2">
                                                    Team Size *
                                                </label>
                                                <select
                                                    id="teamSize"
                                                    required
                                                    value={formData.teamSize}
                                                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                                                    className={inputClasses}
                                                >
                                                    {teamSizes.map((size) => (
                                                        <option key={size} value={size === "Select team size" ? "" : size}>
                                                            {size}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className={inputClasses + " resize-none"}
                                                    placeholder="Tell us about your performance management challenges..."
                                                />
                                            </div>

                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.newsletter}
                                                    onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                                                    className="w-5 h-5 rounded border-border text-primary-brand focus:ring-primary-brand/20"
                                                />
                                                <span className="text-sm text-text-secondary">
                                                    I want to receive occasional insights via email
                                                </span>
                                            </label>

                                            <button
                                                type="submit"
                                                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-brand text-white rounded-2xl font-semibold text-base hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1"
                                            >
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </button>
                                        </motion.form>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center py-16"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                                                <Send className="w-8 h-8 text-green-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white font-heading mb-3">
                                                Message Sent!
                                            </h3>
                                            <p className="text-text-secondary max-w-md mx-auto">
                                                Thank you for reaching out. Our team will get back to you within 24 hours.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </ScrollReveal>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <ScrollReveal delay={0.2}>
                                <div className="interactive-card p-6">
                                    <Calendar className="w-8 h-8 text-primary-brand mb-4" />
                                    <h3 className="text-lg font-bold text-white font-heading mb-2">
                                        Prefer to talk?
                                    </h3>
                                    <p className="text-text-secondary text-sm mb-4">
                                        Schedule a 30-minute call with our team at a time that works for you.
                                    </p>
                                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary-brand hover:gap-3 transition-all">
                                        Schedule a call <Calendar className="w-4 h-4" />
                                    </button>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3}>
                                <div className="interactive-card p-6">
                                    <MessageCircle className="w-8 h-8 text-secondary mb-4" />
                                    <h3 className="text-lg font-bold text-white font-heading mb-2">
                                        Need immediate help?
                                    </h3>
                                    <p className="text-text-secondary text-sm mb-4">
                                        Chat with our support team for quick answers to your questions.
                                    </p>
                                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:gap-3 transition-all">
                                        Start a chat <MessageCircle className="w-4 h-4" />
                                    </button>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.4}>
                                <div className="p-6 rounded-2xl bg-surface">
                                    <h3 className="text-sm font-heading font-semibold text-white uppercase tracking-wider mb-4">
                                        Get in touch
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-text-secondary">
                                            <Mail className="w-4 h-4 text-primary-brand" />
                                            contactus@purplehub.co.in
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-text-secondary">
                                            <Phone className="w-4 h-4 text-primary-brand" />
                                            +91 8904096161
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-text-secondary">
                                            <MapPin className="w-4 h-4 text-primary-brand mt-0.5" />
                                            Bengaluru, India
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-5">
                                        {[Twitter, Linkedin].map((Icon, i) => (
                                            <a
                                                key={i}
                                                href={i === 1 ? "https://www.linkedin.com/company/purplehub-official" : "#"}
                                                target={i === 1 ? "_blank" : undefined}
                                                rel={i === 1 ? "noopener noreferrer" : undefined}
                                                className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-primary-brand hover:border-primary-brand transition-all"
                                            >
                                                <Icon className="w-4 h-4" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 lg:py-32 bg-surface">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16">
                        <p className="section-label">FAQ</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                            Frequently asked <span className="gradient-text">questions</span>
                        </h2>
                    </ScrollReveal>

                    <StaggerContainer staggerDelay={0.08} className="space-y-4">
                        {faqs.map((faq, i) => (
                            <StaggerItem key={faq.question}>
                                <FAQItem
                                    faq={faq}
                                    isOpen={openFAQ === i}
                                    onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                                />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative py-24 lg:py-32 bg-primary-dark overflow-hidden">
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
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                            Ready to get started?
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-green-200/70">
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary-brand" />
                                contactus@purplehub.co.in
                            </div>
                            <div className="hidden sm:block w-1 h-1 rounded-full bg-green-200/30" />
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-primary-brand" />
                                +91 8904096161
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
