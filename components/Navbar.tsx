"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/platform", label: "Platform" },
    { href: "/solutions", label: "Solutions" },
    { href: "/resources", label: "Resources" },
    { href: "/brochure", label: "Brochure" },
    { href: "/contact", label: "Contact" },
];

const homeSections = [
    { id: "real-question", label: "The Real Question" },
    { id: "the-problem", label: "The Problem" },
    { id: "reality-check", label: "Reality Check" },
    { id: "the-shift", label: "The Shift" },
    { id: "the-platform", label: "The Platform" },
    { id: "salient-features", label: "Salient Features" },
    { id: "name-story", label: "Our Name Story" },
    { id: "the-difference", label: "The Difference" },
    { id: "going-beyond", label: "Going Beyond" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [homeDropdown, setHomeDropdown] = useState(false);
    const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setMobileHomeOpen(false);
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
                        {navLinks.map((link) =>
                            link.label === "Home" ? (
                                <div
                                    key={link.href}
                                    className="relative"
                                    onMouseEnter={() => setHomeDropdown(true)}
                                    onMouseLeave={() => setHomeDropdown(false)}
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
                                        <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", homeDropdown ? "rotate-180" : "")} />
                                    </Link>

                                    <AnimatePresence>
                                        {homeDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-1 w-56 py-2 rounded-xl bg-surface/95 backdrop-blur-xl border border-border shadow-2xl shadow-black/30"
                                            >
                                                {homeSections.map((section) => (
                                                    <Link
                                                        key={section.id}
                                                        href={`/#${section.id}`}
                                                        className="block px-4 py-2.5 text-sm text-gray-300 hover:text-primary-brand hover:bg-green-900/20 transition-all duration-200"
                                                        onClick={() => setHomeDropdown(false)}
                                                    >
                                                        {section.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
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
                            )
                        )}
                    </div>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://calendly.com/purplehubweb/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-primary-brand text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5"
                        >
                            REQUEST DEMO
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
                            {navLinks.map((link) =>
                                link.label === "Home" ? (
                                    <div key={link.href}>
                                        <button
                                            onClick={() => setMobileHomeOpen(!mobileHomeOpen)}
                                            className={cn(
                                                "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                                pathname === link.href
                                                    ? "text-primary-brand bg-green-900/30"
                                                    : "text-gray-300 hover:text-primary-brand hover:bg-surface"
                                            )}
                                        >
                                            {link.label}
                                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", mobileHomeOpen ? "rotate-180" : "")} />
                                        </button>
                                        <AnimatePresence>
                                            {mobileHomeOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="pl-4 overflow-hidden"
                                                >
                                                    {homeSections.map((section) => (
                                                        <Link
                                                            key={section.id}
                                                            href={`/#${section.id}`}
                                                            className="block px-4 py-2.5 text-sm text-gray-400 hover:text-primary-brand transition-colors"
                                                        >
                                                            {section.label}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
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
                                )
                            )}
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
