import type { Metadata } from "next";
import TeasersPageClient from "./TeasersPageClient";

export const metadata: Metadata = {
    title: "Teasers | PurpleHub",
    description: "Get a sneak peek into upcoming features, platform updates, and our continuous intelligence journey.",
};

export default function TeasersPage() {
    return <TeasersPageClient />;
}
