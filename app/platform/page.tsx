import type { Metadata } from "next";
import PlatformPageClient from "./PlatformPageClient";

export const metadata: Metadata = {
    title: "Platform Features | Purplehub",
    description:
        "AI-powered continuous performance management that adapts to how your teams actually work. Explore our features: continuous feedback, AI insights, 360° visibility, and more.",
};

export default function PlatformPage() {
    return <PlatformPageClient />;
}
