import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Purplehub",
    description:
        "Learn how Purplehub collects, uses, and protects your personal information. Our commitment to data privacy and security.",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            {/* HERO */}
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-primary-dark via-green-900 to-primary-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 30% 50%, rgba(139,92,246,0.3) 0%, transparent 50%)",
                        }}
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Privacy{" "}
                        <span className="bg-gradient-to-r from-primary-brand to-secondary bg-clip-text text-transparent">
                            Policy
                        </span>
                    </h1>
                    <p className="mt-6 text-lg text-green-200/80 max-w-2xl mx-auto">
                        Your privacy matters to us. Here&apos;s how we handle your data with care and transparency.
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
                                1. Introduction
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Purplehub Technologies Private Limited (&ldquo;Purplehub,&rdquo; &ldquo;we,&rdquo;
                                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and
                                security of your personal information. This Privacy Policy explains how we collect,
                                use, disclose, and safeguard your information when you visit our website
                                (purplehub.co.in), use our platform, or interact with our services.
                            </p>
                            <p className="text-text-secondary leading-relaxed mt-3">
                                By accessing or using our services, you agree to the terms of this Privacy Policy. If
                                you do not agree, please discontinue use of our services.
                            </p>
                        </div>

                        {/* 2 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                2. Information We Collect
                            </h2>
                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                                2.1 Information You Provide
                            </h3>
                            <ul className="space-y-2 text-text-secondary">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">Account Information:</strong> Name, email address, job title, company name, and phone number when you register or request a demo.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">Contact Form Data:</strong> Any information you submit through our contact forms, including your message content.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">Subscription Data:</strong> Email address when you subscribe to our newsletter or updates.</span>
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                                2.2 Information Collected Automatically
                            </h3>
                            <ul className="space-y-2 text-text-secondary">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">Usage Data:</strong> Pages visited, time spent on pages, click patterns, and navigation paths.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">Device Information:</strong> Browser type, operating system, device identifiers, and screen resolution.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">Log Data:</strong> IP address, access times, and referring URLs.</span>
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                                2.3 Platform Data (For Customers)
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                When organizations use the Purplehub performance intelligence platform, employee
                                performance data, feedback, goals, and related HR information are processed on behalf
                                of our customers. This data is governed by the customer&apos;s own privacy policies and
                                our Data Processing Agreement.
                            </p>
                        </div>

                        {/* 3 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                3. How We Use Your Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                We use the information we collect for the following purposes:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: "Service Delivery", desc: "To provide, maintain, and improve our platform and services." },
                                    { title: "Communication", desc: "To respond to inquiries, send updates, and provide customer support." },
                                    { title: "Personalization", desc: "To tailor your experience and deliver relevant content and recommendations." },
                                    { title: "Analytics", desc: "To understand usage patterns and improve our website and platform performance." },
                                    { title: "Security", desc: "To detect, prevent, and address technical issues and security threats." },
                                    { title: "Legal Compliance", desc: "To comply with applicable laws, regulations, and legal processes." },
                                ].map((item) => (
                                    <div key={item.title} className="p-4 rounded-xl bg-surface border border-border">
                                        <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                                        <p className="text-text-secondary text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                4. Data Sharing and Disclosure
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                We do not sell your personal information. We may share your information only in the
                                following circumstances:
                            </p>
                            <ul className="space-y-3 text-text-secondary">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">Service Providers:</strong> With trusted third-party vendors who assist in operating our platform (hosting, analytics, email delivery), bound by confidentiality agreements.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">Legal Requirements:</strong> When required by law, regulation, or legal process, or to protect the rights, property, or safety of Purplehub, our users, or others.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, where your information may be transferred as a business asset.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mt-2 flex-shrink-0" />
                                    <span><strong className="text-white">With Your Consent:</strong> When you have given us explicit permission to share your information for a specific purpose.</span>
                                </li>
                            </ul>
                        </div>

                        {/* 5 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                5. Data Security
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We implement industry-standard security measures to protect your personal information,
                                including encryption in transit and at rest, access controls, regular security audits,
                                and secure development practices. Our platform is designed with enterprise-grade
                                security architecture aligned with SOC 2 Type II, GDPR, and ISO 27001 standards.
                            </p>
                            <p className="text-text-secondary leading-relaxed mt-3">
                                However, no method of transmission over the Internet or electronic storage is 100%
                                secure. While we strive to protect your data, we cannot guarantee absolute security.
                            </p>
                        </div>

                        {/* 6 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                6. Data Retention
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We retain your personal information only for as long as necessary to fulfill the
                                purposes outlined in this policy, unless a longer retention period is required or
                                permitted by law. When data is no longer needed, it is securely deleted or anonymized
                                in accordance with our data retention schedule.
                            </p>
                        </div>

                        {/* 7 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                7. Your Rights
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                Depending on your location, you may have the following rights regarding your personal data:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    "Right to access your personal data",
                                    "Right to rectify inaccurate data",
                                    "Right to request deletion of your data",
                                    "Right to restrict processing",
                                    "Right to data portability",
                                    "Right to withdraw consent",
                                ].map((right) => (
                                    <div key={right} className="flex items-center gap-2 text-text-secondary text-sm">
                                        <span className="w-5 h-5 rounded-lg bg-green-900/30 flex items-center justify-center text-primary-brand text-xs flex-shrink-0">✓</span>
                                        {right}
                                    </div>
                                ))}
                            </div>
                            <p className="text-text-secondary leading-relaxed mt-4">
                                To exercise any of these rights, please contact us at{" "}
                                <a href="mailto:contactus@purplehub.co.in" className="text-primary-brand hover:underline">
                                    contactus@purplehub.co.in
                                </a>.
                                We will respond to your request within 30 days.
                            </p>
                        </div>

                        {/* 8 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                8. Cookies and Tracking
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We use cookies and similar tracking technologies to enhance your browsing experience,
                                analyze website traffic, and understand usage patterns. You can manage your cookie
                                preferences through your browser settings. Disabling certain cookies may limit
                                functionality of our website.
                            </p>
                        </div>

                        {/* 9 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                9. Third-Party Links
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our website may contain links to third-party websites or services that are not
                                operated by Purplehub. We are not responsible for the privacy practices of these
                                external sites. We encourage you to review the privacy policies of any third-party
                                sites you visit.
                            </p>
                        </div>

                        {/* 10 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                10. Children&apos;s Privacy
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our services are not directed to individuals under the age of 18. We do not
                                knowingly collect personal information from children. If you believe we have
                                inadvertently collected such information, please contact us immediately and we will
                                take steps to delete it.
                            </p>
                        </div>

                        {/* 11 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                11. Changes to This Policy
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We may update this Privacy Policy from time to time to reflect changes in our
                                practices or applicable laws. We will notify you of any material changes by posting
                                the updated policy on this page with a revised &ldquo;Last updated&rdquo; date. Your
                                continued use of our services after any changes constitutes acceptance of the updated
                                policy.
                            </p>
                        </div>

                        {/* 12 */}
                        <div className="p-6 rounded-2xl bg-surface border border-border">
                            <h2 className="text-2xl font-bold text-white font-heading mb-4">
                                12. Contact Us
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                If you have any questions or concerns about this Privacy Policy or our data
                                practices, please reach out to us:
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
                                    <strong className="text-white">Address:</strong> Purplehub Technologies Private Limited, Bangalore, India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
