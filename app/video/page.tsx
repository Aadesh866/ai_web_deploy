import type { Metadata } from "next";
import VideoPageWrapper from "./VideoPageWrapper";

export const metadata: Metadata = {
  title: "Video Presentation | Purplehub",
  description: "Purplehub secure video presentation portal.",
  robots: "noindex, nofollow",
};

export default function VideoPage() {
  return <VideoPageWrapper />;
}
