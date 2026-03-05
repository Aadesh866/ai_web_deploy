"use client";

import ScrollReveal from "@/components/ScrollReveal";

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
                    <div
                        className="rounded-2xl border border-border overflow-hidden bg-surface shadow-xl"
                        onContextMenu={(e) => e.preventDefault()}
                        style={{ userSelect: "none" }}
                    >
                        <iframe
                            src="/purplehub-brochure.pdf#toolbar=0&navpanes=0&scrollbar=1"
                            className="w-full"
                            style={{ height: "85vh", minHeight: "700px", border: "none" }}
                            title="PurpleHub Brochure"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
