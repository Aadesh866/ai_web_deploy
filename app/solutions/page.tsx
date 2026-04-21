import type { Metadata } from "next";
import SolutionsPageClient from "./SolutionsPageClient";

export const metadata: Metadata = {
    title: "Solutions | Purplehub",
    description:
        "Industry-specific solutions for technology, manufacturing, professional services, and healthcare. Built for how work actually happens.",
};

export default function SolutionsPage() {
    return <SolutionsPageClient />;
}
