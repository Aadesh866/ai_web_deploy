"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/platform", label: "Platform" },
    { href: "/solutions", label: "Solutions" },
    { href: "/resources", label: "Resources" },
    { href: "/teasers", label: "Teasers" },
    { href: "/brochure", label: "Brochure" },
    { href: "/contact", label: "Contact" },
];

/* Section maps for pages that have dropdowns */
const pageSections: Record<string, { id: string; label: string }[]> = {
    "/": [
        { id: "real-question", label: "The Real Question" },
        { id: "the-problem", label: "The Problem" },
        { id: "reality-check", label: "Reality Check" },
        { id: "the-shift", label: "The Shift" },
        { id: "the-platform", label: "The Platform" },
        { id: "salient-features", label: "Salient Features" },
        { id: "name-story", label: "Our Name Story" },
        { id: "the-difference", label: "The Difference" },
        { id: "hr-density", label: "HR Density" },
        { id: "going-beyond", label: "Going Beyond" },
    ],
    "/platform": [
        { id: "compare", label: "Compare" },
        { id: "features", label: "Capabilities" },
        { id: "how-it-works", label: "How It Works" },
        { id: "tech-stack", label: "Tech Stack" },
        { id: "integrations", label: "Integrations" },
    ],
    "/solutions": [
        { id: "by-industry", label: "By Industry" },
        { id: "by-role", label: "By Role" },
        { id: "use-cases", label: "Use Cases" },
        { id: "success-story", label: "Success Story" },
        { id: "roi-calculator", label: "ROI Calculator" },
    ],
    "/resources": [
        { id: "featured", label: "Featured Report" },
        { id: "browse", label: "Browse Resources" },
        { id: "newsletter", label: "Newsletter" },
        { id: "brochure", label: "Brochure" },
        { id: "events", label: "Events" },
    ],
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    const scrollToSection = (pageHref: string, sectionId: string) => {
        setActiveDropdown(null);
        setMobileOpen(false);
        setMobileAccordion(null);

        const scrollTo = () => {
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                return true;
            }
            return false;
        };

        if (pathname === pageHref) {
            scrollTo();
        } else {
            router.push(pageHref);
            // Poll for the element after page navigation
            let attempts = 0;
            const interval = setInterval(() => {
                if (scrollTo() || attempts > 50) {
                    clearInterval(interval);
                }
                attempts++;
            }, 100);
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setMobileAccordion(null);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "navbar-glass shadow-lg" : "bg-transparent"
            )}
        >
            <nav className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/logo.png"
                            alt="PurpleHub Logo"
                            width={160}
                            height={45}
                            className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const sections = pageSections[link.href];

                            if (sections) {
                                /* Link WITH dropdown */
                                return (
                                    <div
                                        key={link.href}
                                        className="relative"
                                        onMouseEnter={() => setActiveDropdown(link.href)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 inline-flex items-center gap-1",
                                                pathname === link.href
                                                    ? "text-primary-brand bg-green-900/30"
                                                    : "text-gray-300 hover:text-primary-brand hover:bg-green-900/20"
                                            )}
                                        >
                                            {link.label}
                                            <ChevronDown
                                                className={cn(
                                                    "w-3 h-3 transition-transform duration-300",
                                                    activeDropdown === link.href ? "rotate-180" : ""
                                                )}
                                            />
                                        </Link>

                                        <AnimatePresence>
                                            {activeDropdown === link.href && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 8 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 mt-1 w-56 py-2 rounded-xl bg-surface/95 backdrop-blur-xl border border-border shadow-2xl shadow-black/30"
                                                >
                                                    {sections.map((section) => (
                                                        <button
                                                            key={section.id}
                                                            onClick={() => scrollToSection(link.href, section.id)}
                                                            className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-primary-brand hover:bg-green-900/20 transition-all duration-200"
                                                        >
                                                            {section.label}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            /* Link WITHOUT dropdown */
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                                        pathname === link.href
                                            ? "text-primary-brand bg-green-900/30"
                                            : "text-gray-300 hover:text-primary-brand hover:bg-green-900/20"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://calendly.com/purplehubweb/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-primary-brand text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5"
                        >
                            Request a demo
                        </a>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-surface transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-surface border-t border-border overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-1">
                            {navLinks.map((link) => {
                                const sections = pageSections[link.href];

                                if (sections) {
                                    /* Mobile link WITH accordion */
                                    const isOpen = mobileAccordion === link.href;
                                    return (
                                        <div key={link.href}>
                                            <button
                                                onClick={() =>
                                                    setMobileAccordion(isOpen ? null : link.href)
                                                }
                                                className={cn(
                                                    "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                                    pathname === link.href
                                                        ? "text-primary-brand bg-green-900/30"
                                                        : "text-gray-300 hover:text-primary-brand hover:bg-surface"
                                                )}
                                            >
                                                {link.label}
                                                <ChevronDown
                                                    className={cn(
                                                        "w-4 h-4 transition-transform duration-300",
                                                        isOpen ? "rotate-180" : ""
                                                    )}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="pl-4 overflow-hidden"
                                                    >
                                                        {sections.map((section) => (
                                                            <button
                                                                key={section.id}
                                                                onClick={() => scrollToSection(link.href, section.id)}
                                                                className="block w-full text-left px-4 py-2.5 text-sm text-gray-400 hover:text-primary-brand transition-colors"
                                                            >
                                                                {section.label}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                /* Mobile link WITHOUT accordion */
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                            pathname === link.href
                                                ? "text-primary-brand bg-green-900/30"
                                                : "text-gray-300 hover:text-primary-brand hover:bg-surface"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <a
                                href="https://calendly.com/purplehubweb/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-4 text-center px-5 py-3 bg-primary-brand text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-colors"
                            >
                                REQUEST DEMO
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
