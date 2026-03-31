import type { Metadata } from "next";
import InsightsPageClient from "./InsightsPageClient";

export const metadata: Metadata = {
    title: "Insights | PurpleHub",
    description: "Explore the latest insights, teasers, and thought leadership from PurpleHub on LinkedIn.",
};

export default function InsightsPage() {
    return <InsightsPageClient />;
}
