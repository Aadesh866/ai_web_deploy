import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | PurpleHub",
    description:
        "Read PurpleHub's Terms of Service. Understand the terms and conditions governing your use of our performance intelligence platform.",
};

export default function TermsOfServicePage() {
    return (
        <>
            {/* HERO */}
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-primary-dark via-green-900 to-primary-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 70% 50%, rgba(139,92,246,0.3) 0%, transparent 50%)",
                        }}
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Terms of{" "}
                        <span className="bg-gradient-to-r from-primary-brand to-secondary bg-clip-text text-transparent">
                            Service
                        </span>
                    </h1>
                    <p className="mt-6 text-lg text-green-200/80 max-w-2xl mx-auto">
                        Please read these terms carefully before using PurpleHub&apos;s services.
                    </p>
                    <p className="mt-3 text-sm text-green-200/50">
                        Last updated: March 22, 2026
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="prose-custom space-y-12">

                        {/* 1 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                By accessing or using the PurpleHub website (purplehub.co.in), platform, or any
                                related services (collectively, the &ldquo;Services&rdquo;), you agree to be bound
                                by these Terms of Service (&ldquo;Terms&rdquo;). If you are using the Services on
                                behalf of an organization, you represent that you have the authority to bind that
                                organization to these Terms.
                            </p>
                            <p className="text-text-secondary leading-relaxed mt-3">
                                If you do not agree to these Terms, you must not access or use our Services.
                            </p>
                        </div>

                        {/* 2 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                2. Description of Services
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                PurpleHub provides an AI-powered performance intelligence platform designed to help
                                organizations manage, measure, and enhance employee performance. Our Services
                                include, but are not limited to:
                            </p>
                            <ul className="mt-4 space-y-2 text-text-secondary">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    Continuous feedback and performance tracking tools
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    AI-driven performance analytics and insights
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    Role blueprinting and talent mastery mapping
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    360° visibility and cross-functional impact tracking
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    Integration with third-party HR systems and productivity tools
                                </li>
                            </ul>
                        </div>

                        {/* 3 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                3. User Accounts
                            </h2>
                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                                3.1 Registration
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                To access certain features of our platform, you may be required to create an
                                account. You agree to provide accurate, current, and complete information during
                                registration and to keep your account information updated.
                            </p>
                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                                3.2 Account Security
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                You are responsible for maintaining the confidentiality of your account credentials
                                and for all activities that occur under your account. You must notify PurpleHub
                                immediately of any unauthorized use of your account or any other breach of security.
                            </p>
                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                                3.3 Account Termination
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                We reserve the right to suspend or terminate accounts that violate these Terms,
                                engage in fraudulent activity, or remain inactive for extended periods, with
                                reasonable notice where practicable.
                            </p>
                        </div>

                        {/* 4 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                4. Acceptable Use
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                When using our Services, you agree not to:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    "Violate any applicable laws or regulations",
                                    "Infringe upon intellectual property rights of others",
                                    "Transmit malicious code, viruses, or harmful content",
                                    "Attempt to gain unauthorized access to our systems",
                                    "Use the Services to harass, abuse, or discriminate against any person",
                                    "Reverse engineer, decompile, or disassemble the platform",
                                    "Scrape, data-mine, or extract data through automated means",
                                    "Sublicense or resell access to the Services without authorization",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-2 text-text-secondary text-sm">
                                        <span className="w-5 h-5 rounded-lg bg-red-900/30 flex items-center justify-center text-red-400 text-xs flex-shrink-0 mt-0.5">✕</span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                5. Intellectual Property
                            </h2>
                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                                5.1 Our Property
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                All content, features, functionality, trademarks, logos, design elements, and
                                underlying technology of the PurpleHub platform and website are the exclusive
                                property of PurpleHub Technologies Private Limited and are protected by intellectual
                                property laws. Nothing in these Terms grants you any right, title, or interest in
                                our intellectual property.
                            </p>
                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                                5.2 Your Content
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                You retain ownership of any data or content you submit through the platform. By
                                using our Services, you grant PurpleHub a limited, non-exclusive license to process
                                and display your content solely for the purpose of providing the Services.
                            </p>
                        </div>

                        {/* 6 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                6. Subscription and Payment
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Access to PurpleHub&apos;s platform features may require a paid subscription.
                                Subscription plans, pricing, and billing cycles are detailed in your service
                                agreement. All fees are non-refundable except as expressly stated in your agreement
                                or required by applicable law.
                            </p>
                            <p className="text-text-secondary leading-relaxed mt-3">
                                We reserve the right to modify pricing with at least 30 days&apos; prior written
                                notice. Continued use of the Services after a price change constitutes acceptance of
                                the new pricing.
                            </p>
                        </div>

                        {/* 7 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                7. Data Processing
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                For enterprise customers, the processing of employee data through our platform is
                                governed by a separate Data Processing Agreement (DPA), which outlines the
                                responsibilities of both parties regarding data protection, security measures,
                                breach notification procedures, and sub-processor management. Our data processing
                                practices comply with applicable data protection regulations, including GDPR and
                                India&apos;s Digital Personal Data Protection Act.
                            </p>
                        </div>

                        {/* 8 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                8. Service Availability and SLA
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We strive to maintain 99.99% uptime for our platform. However, we do not guarantee
                                uninterrupted access and may occasionally suspend the Services for maintenance,
                                upgrades, or emergency repairs. We will make reasonable efforts to notify customers
                                of planned downtime in advance. Specific uptime commitments and remedies are detailed
                                in the Service Level Agreement (SLA) included in enterprise contracts.
                            </p>
                        </div>

                        {/* 9 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                9. Limitation of Liability
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                To the maximum extent permitted by applicable law, PurpleHub and its officers,
                                directors, employees, and agents shall not be liable for any indirect, incidental,
                                special, consequential, or punitive damages, including but not limited to loss of
                                profits, data, business opportunities, or goodwill, arising out of or related to
                                your use of the Services.
                            </p>
                            <p className="text-text-secondary leading-relaxed mt-3">
                                Our total liability for any claim arising under these Terms shall not exceed the
                                amount paid by you to PurpleHub in the twelve (12) months preceding the claim.
                            </p>
                        </div>

                        {/* 10 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                10. Indemnification
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                You agree to indemnify and hold harmless PurpleHub and its affiliates from any
                                claims, losses, damages, liabilities, costs, or expenses (including reasonable
                                attorney&apos;s fees) arising from your use of the Services, violation of these
                                Terms, or infringement of any third-party rights.
                            </p>
                        </div>

                        {/* 11 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                11. Disclaimer of Warranties
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                The Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
                                warranties of any kind, whether express or implied, including but not limited to
                                implied warranties of merchantability, fitness for a particular purpose, and
                                non-infringement. PurpleHub does not warrant that the Services will be uninterrupted,
                                error-free, or completely secure.
                            </p>
                        </div>

                        {/* 12 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                12. Governing Law and Dispute Resolution
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of India.
                                Any disputes arising out of or relating to these Terms or the Services shall be
                                subject to the exclusive jurisdiction of the courts located in Bangalore, Karnataka,
                                India.
                            </p>
                            <p className="text-text-secondary leading-relaxed mt-3">
                                Before initiating legal proceedings, both parties agree to attempt to resolve
                                disputes through good-faith negotiation for a period of at least thirty (30) days.
                            </p>
                        </div>

                        {/* 13 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                13. Modifications to Terms
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                PurpleHub reserves the right to modify these Terms at any time. Material changes will
                                be communicated through the website or via email to registered users. Continued use
                                of the Services following any modifications constitutes acceptance of the revised
                                Terms. We recommend reviewing these Terms periodically for updates.
                            </p>
                        </div>

                        {/* 14 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                14. Severability
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                If any provision of these Terms is found to be unenforceable or invalid by a court of
                                competent jurisdiction, that provision shall be limited or eliminated to the minimum
                                extent necessary, and the remaining provisions shall continue in full force and
                                effect.
                            </p>
                        </div>

                        {/* 15 */}
                        <div className="p-6 rounded-2xl bg-surface border border-border">
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                15. Contact Us
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="space-y-2 text-text-secondary text-sm">
                                <p>
                                    <strong className="text-white">Email:</strong>{" "}
                                    <a href="mailto:contactus@purplehub.co.in" className="text-primary-brand hover:underline">
                                        contactus@purplehub.co.in
                                    </a>
                                </p>
                                <p>
                                    <strong className="text-white">Phone:</strong> +91 8904096161
                                </p>
                                <p>
                                    <strong className="text-white">Address:</strong> PurpleHub Technologies Private Limited, Bangalore, India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
