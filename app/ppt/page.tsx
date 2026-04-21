import type { Metadata } from "next";
import PPTPageClient from "./PPTPageClient";

export const metadata: Metadata = {
  title: "Presentation | Purplehub",
  description: "Purplehub client presentation.",
  robots: "noindex, nofollow",
};

async function getPPTUrl(): Promise<string> {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const res = await fetch(
      `${supabaseUrl}/rest/v1/ppt_config?id=eq.main&select=url`,
      {
        headers: {
          apikey: supabaseKey!,
          Authorization: `Bearer ${supabaseKey!}`,
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
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return <PPTPageClient initialUrl={initialUrl} supabaseUrl={supabaseUrl!} supabaseKey={supabaseKey!} />;
}
