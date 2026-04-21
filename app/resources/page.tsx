import type { Metadata } from "next";
import ResourcesPageClient from "./ResourcesPageClient";

export const metadata: Metadata = {
    title: "Resources | Purplehub",
    description:
        "Research, guides, and best practices from performance management experts. Stay ahead with insights on continuous feedback, AI in HR, and modern talent strategies.",
};

export default function ResourcesPage() {
    return <ResourcesPageClient />;
}
