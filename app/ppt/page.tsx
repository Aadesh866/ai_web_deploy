import type { Metadata } from "next";
import PPTPageClient from "./PPTPageClient";

export const metadata: Metadata = {
  title: "Presentation | PurpleHub",
  description: "PurpleHub client presentation.",
  robots: "noindex, nofollow",
};

async function getPPTUrl(): Promise<string> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/ppt_config?id=eq.main&select=url`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data[0]?.url || "";
  } catch {
    return "";
  }
}


export default async function PPTPage() {
  const initialUrl = await getPPTUrl();
  return <PPTPageClient initialUrl={initialUrl} />;
}
