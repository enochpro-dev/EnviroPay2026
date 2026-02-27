"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ROLES = ["I'm a consumer", "I'm a retailer", "I'm a partner"] as const;

export function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedRole, setSelectedRole] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("[data-contact-reveal]", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-24 lg:py-32 overflow-hidden"
        >
            {/* ─── Vibrant gradient background echoing the hero palette ─── */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F8] via-[#E0F2FE] to-[#F0F4F8]" />

            {/* Subtle radial glow behind the form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#67E8F9]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* ─── Content ─── */}
            <div className="relative z-10 container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12" data-contact-reveal>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-outfit)] text-[#0B132B] tracking-tight mb-4">
                        Let&apos;s <span className="text-[#0EA5E9] italic font-[family-name:var(--font-lora)]">talk</span>
                    </h2>
                    <p className="text-lg text-[#64748B] max-w-md mx-auto">
                        Tell us who you are and we&apos;ll get back to you.
                    </p>
                </div>

                {/* Role Pills */}
                <div className="flex justify-center gap-3 mb-10" data-contact-reveal>
                    {ROLES.map((role, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedRole(i)}
                            className={`btn-magnetic px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedRole === i
                                ? "bg-[#0B132B] text-white shadow-lg shadow-[#0B132B]/20"
                                : "bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0EA5E9]/40 hover:text-[#0B132B]"
                                }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>

                {/* Form Card — frosted glass with vibrant accents */}
                <div
                    data-contact-reveal
                    className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-10 shadow-[0_8px_40px_-12px_rgba(14,165,233,0.12)] border border-white/80"
                >
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-[#0B132B] mb-2 font-[family-name:var(--font-outfit)]">Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full px-4 py-3.5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9]/50 transition-all font-[family-name:var(--font-inter)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#0B132B] mb-2 font-[family-name:var(--font-outfit)]">
                                Email <span className="text-[#0EA5E9]">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="you@email.com"
                                className="w-full px-4 py-3.5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9]/50 transition-all font-[family-name:var(--font-inter)]"
                            />
                        </div>
                    </div>

                    {/* CTA — matches Hero gradient (cyan → blue) for bookend consistency */}
                    <button className="btn-magnetic group w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#67E8F9] to-[#2563EB] text-white shadow-lg shadow-[#2563EB]/20 hover:shadow-[#2563EB]/30 transition-all">
                        <Sparkles size={16} fill="currentColor" strokeWidth={0} />
                        Join Waitlist
                        <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Trust line */}
                <p data-contact-reveal className="text-center text-sm text-[#94A3B8] mt-8 font-[family-name:var(--font-ibm-plex-mono)]">
                    No spam. Unsubscribe anytime. We respect your data.
                </p>
            </div>
        </section>
    );
}
