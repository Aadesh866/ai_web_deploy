import type { Metadata } from "next";
import PPTPageClient from "./PPTPageClient";

export const metadata: Metadata = {
  title: "Presentation | PurpleHub",
  description: "PurpleHub client presentation.",
  robots: "noindex, nofollow",
};

async function getPPTUrl(): Promise<string> {
  try {
    // Read config from filesystem directly on server
    const { promises: fs } = await import("fs");
    const path = await import("path");
    const configPath = path.join(process.cwd(), "ppt-config.json");
    const raw = await fs.readFile(configPath, "utf-8");
    const json = JSON.parse(raw);
    return json.url || "";
  } catch {
    return "";
  }
}

export default async function PPTPage() {
  const initialUrl = await getPPTUrl();
  return <PPTPageClient initialUrl={initialUrl} />;
}
