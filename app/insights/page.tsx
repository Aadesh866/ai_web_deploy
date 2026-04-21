import type { Metadata } from "next";
import InsightsPageClient from "./InsightsPageClient";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Insights | Purplehub",
    description: "Explore the latest insights, teasers, and thought leadership from Purplehub on LinkedIn.",
};

const SHEET_ID = "1D7SKY65vSpByhyO9UimUHtDIAul9996qTUPUJqmuehI";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

function parseCSV(text: string): string[][] {
    const rows: string[][] = [];
    let current = "";
    let inQuotes = false;
    let row: string[] = [];

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"') {
            if (inQuotes && text[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            row.push(current.trim());
            current = "";
        } else if ((char === "\n" || char === "\r") && !inQuotes) {
            if (current || row.length > 0) {
                row.push(current.trim());
                rows.push(row);
                row = [];
                current = "";
            }
            if (char === "\r" && text[i + 1] === "\n") i++;
        } else {
            current += char;
        }
    }
    if (current || row.length > 0) {
        row.push(current.trim());
        rows.push(row);
    }
    return rows;
}

async function getPosts() {
    try {
        const res = await fetch(SHEET_URL, { 
            next: { revalidate: 0 }, // Always fetch fresh data
            headers: { "User-Agent": "Mozilla/5.0" }
        });
        
        if (!res.ok) return [];
        
        const text = await res.text();
        if (text.trimStart().startsWith("<")) return []; // HTML response guard
        
        const rows = parseCSV(text);
        const posts: any[] = [];
        
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            
            // Rigidly: B (1) = Link, C (2) = Title
            const link = row[1];
            const title = row[2];

            if (link && link.includes("linkedin.com")) {
                posts.push({
                    number: row[0] || String(i),
                    title: (title || "").trim(),
                    url: link.trim(),
                });
            }
        }
        console.log("POSTS BEING RETURNED:", JSON.stringify(posts, null, 2));
        return posts;
    } catch (error) {
        console.error("Failed to fetch insights:", error);
        return [];
    }
}

export default async function InsightsPage() {
    const posts = await getPosts();
    return <InsightsPageClient initialPosts={posts} />;
}
