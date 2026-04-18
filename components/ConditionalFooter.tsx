"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

// Hides the footer on specific standalone pages like /ppt
export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/ppt")) return null;
  return <Footer />;
}
