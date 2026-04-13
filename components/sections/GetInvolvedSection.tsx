"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Users, Store, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
    {
        icon: Users,
        name: "Consumer",
        tagline: "Get paid for recycling",
        features: [
            "Free EnviroWallet account",
            "Scan & return at any EnviroPoint",
            "Withdraw to your bank or donate",
            "Track your environmental impact",
        ],
        cta: "Try the Beta",
        featured: false,
    },
    {
        icon: Store,
        name: "Retailer",
        tagline: "Be DRS-ready from day one",
        features: [
            "Plug-in return point integration",
            "Drive footfall with EnviroPay users",
            "Real-time dashboard & analytics",
            "Dedicated onboarding support",
            "Early-access partner programme",
        ],
        cta: "Partner With Us",
        featured: true,
    },
    {
        icon: Handshake,
        name: "Partner",
        tagline: "Build the UK's return infrastructure",
        features: [
            "API access for RVM operators",
            "White-label wallet integration",
            "Revenue-share model",
            "Early investor information",
        ],
        cta: "Talk to Us",
        featured: false,
    },
];

export function GetInvolvedSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const photoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax on community photo
            if (photoRef.current) {
                gsap.to(photoRef.current, {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Card entrance
            gsap.from("[data-tier-card]", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "[data-tier-grid]",
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="get-involved" ref={sectionRef} className="relative overflow-hidden">

            {/* ─── Full-section community photo background ─── */}
            <div className="absolute inset-0">
                <img
                    ref={photoRef}
                    src="/images/upscaled/community-involved.jpeg"
                    alt=""
                    className="w-full h-[130%] object-cover object-center scale-110"
                />
            </div>
            {/* Lighter scrim — lets the photo breathe */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/20 via-[#0B132B]/40 to-[#0B132B]/70" />

            {/* ─── Content ─── */}
            <div className="relative z-10">

                {/* Hero header area — sits on the clear part of the photo */}
                <div className="h-[70vh] lg:h-[80vh] flex items-end">
                    <div className="container mx-auto px-6 pb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-outfit)] text-white tracking-tight mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                            Get <span className="text-[#A8E10C] italic font-[family-name:var(--font-lora)]">involved</span>
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                            EnviroPay is launching in 2027. Be part of it from the start.
                        </p>
                    </div>
                </div>

                {/* Cards — glassmorphic panels floating over the photo */}
                <div className="pb-20 lg:pb-28">
                    <div data-tier-grid className="container mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {TIERS.map((tier, i) => {
                                const Icon = tier.icon;
                                return (
                                    <div
                                        key={i}
                                        data-tier-card
                                        className={`rounded-[2rem] p-8 flex flex-col transition-all duration-500 hover:translate-y-[-4px] ${tier.featured
                                            ? "bg-white/12 backdrop-blur-2xl ring-1 ring-[#A8E10C]/40 shadow-[0_8px_40px_-12px_rgba(168,225,12,0.25)] scale-[1.02]"
                                            : "bg-white/8 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.3)]"
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className={`p-3 rounded-xl w-fit mb-6 ${tier.featured ? "bg-[#A8E10C]/20" : "bg-white/10"
                                            }`}>
                                            <Icon size={24} className={tier.featured ? "text-[#A8E10C]" : "text-white/70"} />
                                        </div>

                                        {/* Name */}
                                        <h3 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white mb-2">
                                            {tier.name}
                                        </h3>
                                        <p className="text-sm text-white/50 mb-6">{tier.tagline}</p>

                                        {/* Features */}
                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {tier.features.map((feature, j) => (
                                                <li key={j} className="flex items-start gap-3 text-sm text-white/70">
                                                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${tier.featured ? "bg-[#A8E10C]" : "bg-white/40"}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA */}
                                        <a
                                            href={`#contact-${tier.name.toLowerCase()}`}
                                            className={`btn-magnetic group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all ${tier.featured
                                                ? "bg-gradient-to-r from-[#A8E10C] to-[#00C9A7] text-[#0B132B] shadow-lg hover:shadow-[0_4px_24px_-4px_rgba(168,225,12,0.4)]"
                                                : "bg-white/10 text-white/90 hover:bg-white/15 border border-white/15"
                                                }`}
                                        >
                                            {tier.cta}
                                            <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
