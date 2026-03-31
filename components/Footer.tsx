import Link from "next/link";
import Image from "next/image";
import {
    Zap,
    Twitter,
    Linkedin,
    Github,
    Youtube,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

const footerLinks = {
    product: [
        { label: "Platform", href: "/platform" },
        { label: "Solutions", href: "/solutions" },
        { label: "Resources", href: "/resources" },
        { label: "Teasers", href: "/teasers" },
        { label: "Brochure", href: "/brochure" },
    ],
    support: [
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
    ],
};

const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "https://in.linkedin.com/company/ph-techindia", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
    return (
        <footer className="bg-primary-dark text-white border-t border-border">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-5">
                            <Image
                                src="/logo.png"
                                alt="PurpleHub Logo"
                                width={140}
                                height={40}
                                className="h-9 w-auto"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-2">
                            For.. people matter
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            The performance intelligence platform built for how work actually
                            happens today.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary-brand hover:bg-white/10 transition-all duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-5">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-primary-brand transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-5">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-primary-brand transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div>
                        <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-5">
                            Get in Touch
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="w-4 h-4 text-primary-brand flex-shrink-0" />
                                contactus@purplehub.co.in
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone className="w-4 h-4 text-primary-brand flex-shrink-0" />
                                +91 8904096161
                            </li>
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="w-4 h-4 text-primary-brand flex-shrink-0 mt-0.5" />
                                Bangalore, India
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} PurpleHub. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-1.5">
                        Made by <Zap className="w-3.5 h-3.5 text-primary-brand" /> <a href="https://rizeeweb.com" target="_blank" rel="noopener noreferrer" className="text-primary-brand font-semibold hover:underline">Rizeeweb</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
