import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#F4F7F5]">
            <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">

                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-[#163841]/60 hover:text-[#00B01A] font-medium mb-12 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-black/5">
                    <header className="mb-12 border-b border-black/5 pb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#163841] mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-[#163841]/60 text-lg">
                            Last updated: 23/12/25
                        </p>
                    </header>

                    <div className="space-y-12 text-[#163841]/80 leading-relaxed text-lg">

                        <section>
                            <p className="mb-6">
                                EnviroPay Ltd (“EnviroPay”, “we”, “us”, “our”) is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you use the EnviroPay app and related services.
                            </p>
                            <p>
                                EnviroPay is registered in the United Kingdom and complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">1. Who We Are</h2>
                            <p className="mb-6">
                                EnviroPay Ltd is the data controller responsible for your personal data.
                                If you have any questions about this policy or how we use your data, you can contact us at:
                            </p>
                            <div className="bg-[#F4F7F5] p-6 rounded-2xl space-y-2 text-base">
                                <p><strong>Email:</strong> privacy@enviropay.com</p>
                                <p><strong>Website:</strong> www.enviropay.com</p>
                                <p><strong>Company:</strong> EnviroPay Ltd</p>
                                <div className="pt-2">
                                    <strong>Postal address:</strong><br />
                                    EnviroPay Ltd.<br />
                                    7-75 Shelton St,<br />
                                    Covent Garden,<br />
                                    London, WC2H 9JQ<br />
                                    United Kingdom
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">2. What Data We Collect</h2>
                            <p className="mb-6">
                                We only collect personal data that is necessary to provide our services and protect the platform.
                            </p>

                            <div className="p-6 border border-[#00B01A]/20 bg-[#00B01A]/5 rounded-2xl mb-8">
                                <p className="text-sm font-bold text-[#00B01A] uppercase tracking-wider mb-2">Children's Data</p>
                                <p className="text-base">
                                    EnviroPay’s services are not intended for children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-[#163841] mb-3">Information you provide:</h3>
                                    <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A]">
                                        <li>Email address</li>
                                        <li>Mobile phone number</li>
                                        <li>Account identifiers (user ID)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#163841] mb-3">Automatically collected information:</h3>
                                    <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A]">
                                        <li>Device and app metadata (e.g. device type, operating system)</li>
                                        <li>Log and usage data</li>
                                        <li><strong>Website cookies and analytics data</strong> (if you visit www.enviropay.com): IP address, device type, browser information, pages viewed, and cookie identifiers. We may use essential cookies required for the website to function and, where enabled, privacy-friendly analytics to understand website performance.</li>
                                        <li>Transaction references and timestamps</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#163841] mb-3">Payments data:</h3>
                                    <p>
                                        Payments and refunds may be processed by third-party payment providers (such as Stripe). EnviroPay does not store full payment card details. Payment providers handle sensitive payment information in accordance with their own security standards and privacy policies.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">3. How We Use Your Data</h2>
                            <p className="mb-4">We use your personal data to:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A]">
                                <li>Create and manage your EnviroPay account</li>
                                <li>Process and display deposit refunds</li>
                                <li>Enable withdrawals via our payment provider</li>
                                <li>Prevent fraud, misuse, and abuse of the service</li>
                                <li>Comply with legal and regulatory obligations</li>
                                <li>Provide customer support</li>
                                <li>Improve the reliability and security of the app</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">4. Our Lawful Bases for Processing</h2>
                            <p className="mb-4">Under UK GDPR, we rely on the following lawful bases:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A] mb-6">
                                <li><strong>Contract</strong> – to provide the EnviroPay service, including refunds and withdrawals</li>
                                <li><strong>Legitimate interests</strong> – to protect the platform, prevent fraud, and ensure security</li>
                                <li><strong>Legal obligation</strong> – to retain transaction and financial records where required</li>
                            </ul>
                            <p>
                                We do not rely on consent for core app functionality. Consent is only used for optional communications such as marketing.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">5. Payments & Financial Information</h2>
                            <p className="mb-4">Payments and refunds are processed through third‑party payment providers (currently Stripe).</p>
                            <ul className="list-disc pl-5 space-y-4 marker:text-[#00B01A] mb-4">
                                <li>These providers process payment and payout data on our behalf (as a data processor) to enable deposits, refunds, and withdrawals where available.</li>
                                <li>EnviroPay does not store full payment card details. Where funds or balances are involved, they are handled through our payment providers and related financial infrastructure according to the applicable product configuration and legal requirements.</li>
                                <li>EnviroPay operates the platform experience and instructions, while payment providers execute payment processing. If you have questions about how a particular payment flow works, contact us using the details above.</li>
                            </ul>
                            <p>Stripe processes personal data in accordance with its own privacy policy.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">6. Fraud Prevention & Security</h2>
                            <p className="mb-4">To protect users and the integrity of the service, we process limited data for fraud and security purposes, including:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A] mb-4">
                                <li>Monitoring transaction patterns</li>
                                <li>Applying limits and checks</li>
                                <li>Investigating suspicious activity</li>
                            </ul>
                            <p>These measures are proportionate, minimised, and designed to protect both users and the wider recycling scheme.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">7. How We Protect Your Data</h2>
                            <p className="mb-4">We apply appropriate technical and organisational security measures, including:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A] mb-4">
                                <li>Encryption in transit and at rest</li>
                                <li>Role-based access controls</li>
                                <li>Secure cloud infrastructure</li>
                                <li>Audit logs and monitoring</li>
                            </ul>
                            <p>Access to personal data is limited to authorised personnel only.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">8. How Long We Keep Your Data</h2>
                            <p className="mb-4">We retain personal data only for as long as necessary:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A]">
                                <li><strong>Account data:</strong> while your account is active</li>
                                <li><strong>Transaction records:</strong> up to 6–7 years (legal and audit purposes)</li>
                                <li><strong>Logs and security data:</strong> up to 24 months</li>
                                <li><strong>Marketing data:</strong> until you opt out</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">9. Sharing Your Data</h2>
                            <p className="mb-4">We may share personal data with:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A] mb-4">
                                <li>Payment providers (e.g. Stripe)</li>
                                <li>Technology and hosting providers</li>
                                <li>Legal or regulatory authorities where required by law</li>
                            </ul>
                            <p>We do not sell your personal data.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">10. Your Rights</h2>
                            <p className="mb-4">You have the right to:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A] mb-4">
                                <li>Access your personal data</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data (subject to legal retention requirements)</li>
                                <li>Object to certain processing</li>
                                <li>Request data portability</li>
                            </ul>
                            <p>You can exercise your rights by contacting us using the details above.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">11. International Transfers</h2>
                            <p>Where personal data is processed outside the UK, we ensure appropriate safeguards are in place, such as standard contractual clauses.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">12. Changes to This Policy</h2>
                            <p>We may update this Privacy Policy from time to time. Any changes will be posted in the app or on our website.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-6">13. Complaints</h2>
                            <p>
                                If you have concerns about how we handle your data, you may contact us directly.<br />
                                You also have the right to complain to the Information Commissioner’s Office (ICO).
                            </p>
                        </section>

                    </div>

                    <footer className="mt-16 pt-12 border-t border-black/5 text-center text-[#163841]/50 text-sm">
                        &copy; {new Date().getFullYear()} EnviroPay Ltd. All rights reserved.
                    </footer>
                </div>
            </div>
        </div>
    );
}
