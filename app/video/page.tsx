import type { Metadata } from "next";
import VideoClient from "./VideoClient";

export const metadata: Metadata = {
  title: "Video Presentation | Purplehub",
  description: "Purplehub secure video presentation portal.",
  robots: "noindex, nofollow",
};

export default function VideoPage() {
  return <VideoClient />;
}
