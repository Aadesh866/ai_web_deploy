import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
    title: "Contact Us | PurpleHub",
    description:
        "Ready to transform how your organization approaches talent? Get in touch for a demo, pricing, or questions about our AI-powered performance management platform.",
};

export default function ContactPage() {
    return <ContactPageClient />;
}
