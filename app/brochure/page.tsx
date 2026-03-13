"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";

function AutoPlayVideo({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showControls, setShowControls] = useState(false);
    const [userPaused, setUserPaused] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !userPaused) {
                    video.muted = false;
                    video.play().catch(() => {
                        video.muted = true;
                        video.play().catch(() => { });
                    });
                    setShowControls(false);
                } else {
                    video.pause();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [userPaused]);

    const handleClick = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            setUserPaused(false);
            setShowControls(false);
            video.play().catch(() => { });
        } else {
            setUserPaused(true);
            setShowControls(true);
            video.pause();
        }
    }, []);

    return (
        <div onContextMenu={(e) => e.preventDefault()} style={{ userSelect: "none" }}>
            <video
                ref={videoRef}
                className="w-full rounded-2xl border border-border shadow-2xl shadow-green-500/10 cursor-pointer"
                controls={showControls}
                controlsList="nodownload"
                disablePictureInPicture
                playsInline
                preload="metadata"
                onClick={handleClick}
                onContextMenu={(e) => e.preventDefault()}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default function BrochurePage() {
    return (
        <>
            <section className="pt-32 pb-12">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-8">
                        <p className="section-label">BROCHURE</p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            The <span className="gradient-text">PurpleHub</span> Brochure
                        </h1>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            A comprehensive overview of how PurpleHub transforms performance management.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="pb-24 lg:pb-32">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <ScrollReveal>
                        <AutoPlayVideo src="/purplehub-brochure-video.mp4" />
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
