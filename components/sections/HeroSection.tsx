"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const trustRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from("[data-hero-badge]", {
                y: 30,
                opacity: 0,
                duration: 0.8,
            })
                .from("[data-hero-heading] > *", {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.08,
                }, "-=0.4")
                .from(subRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                }, "-=0.6")
                .from(ctaRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                }, "-=0.5")
                .from(trustRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                }, "-=0.4");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-dvh flex items-center overflow-hidden"
        >
            {/* ─── Background: Full-bleed image with gradient overlay ─── */}
            <div className="absolute inset-0">
                <img
                    src="/images/hero-enviropay.jpeg"
                    alt=""
                    className="w-full h-full object-cover"
                />
                {/* Deep ocean blue gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041525] via-[#041525]/80 to-[#041525]/30" />
                {/* Extra darkness at bottom for text contrast */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#041525] to-transparent" />
            </div>

            {/* ─── Content: Pushed to bottom-left third ─── */}
            <div className="relative z-10 container mx-auto px-6 pb-12 pt-28 md:pb-20 md:pt-40 lg:pb-24 lg:max-w-[65%] lg:mr-auto lg:ml-0 lg:pl-16">

                {/* Badge */}
                <div
                    data-hero-badge
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8 bg-white/5 backdrop-blur-md border border-white/10 text-[#0EA5E9]"
                >
                    <Sparkles size={14} fill="currentColor" strokeWidth={0} />
                    <span className="tracking-wide uppercase text-[11px] font-[family-name:var(--font-ibm-plex-mono)]">
                        Ahead of the UK DRS 2027
                    </span>
                </div>

                {/* Massive Heading */}
                <div data-hero-heading ref={headingRef} className="mb-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold font-[family-name:var(--font-outfit)] leading-[1.05] tracking-tight text-white">
                        <span className="block">Recycling meets</span>
                    </h1>
                    <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-[family-name:var(--font-lora)] italic leading-[1] tracking-tight text-[#0EA5E9] mt-2">
                        reward.
                    </p>
                </div>

                {/* Sub-headline */}
                <p
                    ref={subRef}
                    className="text-lg md:text-xl leading-relaxed max-w-lg text-white/60 mb-10 font-[family-name:var(--font-inter)]"
                >
                    The UK&apos;s digital deposit-return platform. Scan any container, return it nearby, and get paid instantly to your EnviroWallet.
                </p>

                {/* CTA */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button
                        onClick={() => scrollToSection("get-involved")}
                        className="btn-magnetic group px-8 py-3.5 rounded-full font-bold text-base flex items-center justify-center gap-3 shadow-lg bg-gradient-to-r from-[#67E8F9] to-[#2563EB] text-white"
                    >
                        Join the Waitlist
                        <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                        href="#how-it-works"
                        onClick={(e) => { e.preventDefault(); scrollToSection("how-it-works"); }}
                        className="btn-magnetic px-8 py-3.5 rounded-full font-bold text-base flex items-center justify-center gap-3 text-white/80 border border-white/15 hover:bg-white/5 hover:text-white"
                    >
                        See How It Works
                    </a>
                </div>

                {/* Trust line */}
                <p
                    ref={trustRef}
                    className="text-sm text-white/30 font-[family-name:var(--font-ibm-plex-mono)] tracking-wide"
                >
                    Coming 2027 — ahead of the UK&apos;s Deposit Return Scheme
                </p>
            </div>
        </section>
    );
}
