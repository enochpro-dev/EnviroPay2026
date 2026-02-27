import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfUse() {
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
                            Terms of Use
                        </h1>
                        <p className="text-[#163841]/60 text-lg">
                            Last updated: 30 December 2025
                        </p>
                    </header>

                    <div className="space-y-12 text-[#163841]/80 leading-relaxed text-lg">

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">1. Introduction</h2>
                            <p className="mb-4">
                                Welcome to EnviroPay. These Terms of Use ("Terms") govern your access to and use of the EnviroPay website, mobile application, and digital wallet services (collectively, the "Service").
                            </p>
                            <p>
                                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Service.
                            </p>
                            <div className="bg-[#163841]/5 p-6 rounded-2xl mt-6 text-sm">
                                <p><strong>Service Provider:</strong> EnviroPay Ltd ("we", "us", or "our")</p>
                                <p><strong>Registered Address:</strong> 7-75 Shelton St, Covent Garden, London, WC2H 9JQ, United Kingdom</p>
                                <p><strong>Contact:</strong> legal@enviropay.com</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">2. The Service</h2>
                            <p className="mb-4">
                                EnviroPay is a digital platform designed to facilitate the UK's Deposit Return Scheme (DRS). The Service allows users to:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A]">
                                <li>Identify eligible return points and Reverse Vending Machines (RVMs).</li>
                                <li>Verify returned containers via integrated partners.</li>
                                <li>Receive digital credits ("refunds") for validated returns.</li>
                                <li>Withdraw funds to a connected bank account or donate to charity.</li>
                            </ul>
                            <div className="p-6 border border-[#00B01A]/20 bg-[#00B01A]/5 rounded-2xl mt-6">
                                <p className="text-sm font-bold text-[#00B01A] uppercase tracking-wider mb-2">Pilot & Beta Notice</p>
                                <p className="text-base">
                                    Please note that EnviroPay may continuously test new features. The availability of refund points and withdrawal speeds may vary during pilot phases. We do not guarantee that the Service will be error-free or uninterrupted.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">3. Eligibility & Registration</h2>
                            <p className="mb-4">To use EnviroPay, you must:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A] mb-4">
                                <li>Be at least 13 years old (users under 18 may require parental consent for certain financial features).</li>
                                <li>Be a resident of the United Kingdom.</li>
                                <li>Create an account with accurate, current, and complete information.</li>
                            </ul>
                            <p>
                                You are responsible for maintaining the confidentiality of your login credentials. You must notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">4. Deposits, Refunds & Withdrawals</h2>

                            <h3 className="font-bold text-[#163841] mb-2 mt-6">4.1 Verification</h3>
                            <p className="mb-4">
                                Refunds are only issued for containers that are successfully scanned, verified, and accepted by our partner network or RVMs. We rely on third-party hardware validation; EnviroPay is not liable for containers rejected by RVMs due to damage, label errors, or system faults.
                            </p>

                            <h3 className="font-bold text-[#163841] mb-2">4.2 Account Balance</h3>
                            <p className="mb-4">
                                The balance displayed in your EnviroPay wallet represents a claim against the deposited funds held by the scheme administrator or retailer. It is not a bank account and does not accrue interest.
                            </p>

                            <h3 className="font-bold text-[#163841] mb-2">4.3 Fraud Prevention</h3>
                            <p className="mb-4">
                                We reserve the right to withhold, suspend, or cancel any refund or withdrawal if we suspect fraud, duplicate scanning, or manipulation of the return process.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">5. Prohibited Conduct</h2>
                            <p className="mb-4">You agree not to:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A]">
                                <li>Attempt to scan the same container multiple times for clear financial gain ("double redemption").</li>
                                <li>Reverse engineer, decompile, or attempt to extract the source code of the Service.</li>
                                <li>Use the Service for any illegal purpose or to facilitate money laundering.</li>
                                <li>Interfere with the security or operation of the Service.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">6. Intellectual Property</h2>
                            <p>
                                The EnviroPay name, logo, design, and all underlying software and technology are the exclusive property of EnviroPay Ltd. You are granted a limited, non-exclusive, non-transferable license to use the app for personal, non-commercial purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">7. Limitation of Liability</h2>
                            <p className="mb-4">
                                To the maximum extent permitted by law, EnviroPay Ltd shall not be liable for:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#00B01A] mb-4">
                                <li>Indirect, incidental, or consequential damages.</li>
                                <li>Loss of funds due to user error (e.g., incorrect bank details).</li>
                                <li>Failures of third-party systems (e.g., banking networks, RVM hardware).</li>
                            </ul>
                            <p>
                                Our total liability for any claim arising out of these Terms shall not exceed the total amount of verified refunds held in your account at the time of the event.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">8. Termination</h2>
                            <p>
                                We may terminate or suspend your account immediately, without prior notice, if you breach these Terms. Upon termination, your right to use the Service will cease immediately.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">9. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of London, United Kingdom.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">10. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these Terms at any time. We will notify you of any material changes via the app or email. Your continued use of the Service constitutes acceptance of the new Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-[#163841] mb-4">11. Contact Us</h2>
                            <p className="mb-4">
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <a href="mailto:info@enviropay.com" className="text-[#00B01A] font-bold hover:underline">info@enviropay.com</a>
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
