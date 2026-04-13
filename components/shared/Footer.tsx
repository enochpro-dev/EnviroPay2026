"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Pre-computed particle positions to avoid hydration mismatch ── */
const PARTICLES = [
    { left: 8, top: 15, delay: 0, dur: 5 },
    { left: 15, top: 45, delay: 1.2, dur: 6 },
    { left: 22, top: 70, delay: 2.8, dur: 4.5 },
    { left: 30, top: 25, delay: 0.5, dur: 7 },
    { left: 38, top: 55, delay: 3.1, dur: 5.5 },
    { left: 45, top: 35, delay: 1.8, dur: 6.5 },
    { left: 52, top: 65, delay: 4.2, dur: 4 },
    { left: 58, top: 20, delay: 0.8, dur: 7.5 },
    { left: 65, top: 50, delay: 2.5, dur: 5.2 },
    { left: 72, top: 75, delay: 3.8, dur: 6.2 },
    { left: 78, top: 30, delay: 1.5, dur: 4.8 },
    { left: 85, top: 60, delay: 4.5, dur: 5.8 },
    { left: 92, top: 40, delay: 0.3, dur: 6.8 },
    { left: 12, top: 80, delay: 2.2, dur: 5.3 },
    { left: 48, top: 18, delay: 3.5, dur: 7.2 },
];

const FOOTER_LINKS = {
    About: [
        { label: "Contact Us", href: "#contact" },
        { label: "Press", href: "#" },
        { label: "Careers", href: "#" },
    ],
    "For Users": [
        { label: "FAQ", href: "#" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
    ],
    "For Business": [
        { label: "Retailers", href: "#retailers" },
        { label: "Partners & Investors", href: "#partners" },
    ],
    Connect: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/enviropayuk/", external: true },
        { label: "Instagram", href: "#", external: true },
        { label: "Hello@EnviroPay.uk", href: "mailto:hello@enviropay.uk" },
    ],
};

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const wordmarkRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            /* ── Wordmark scroll reveal ── */
            const enviroSpan = document.querySelector("[data-enviro-word]");
            const payLetters = gsap.utils.toArray<HTMLSpanElement>("[data-pay-letter]");

            if (enviroSpan) {
                gsap.from(enviroSpan, {
                    y: 100,
                    opacity: 0,
                    duration: 1.4,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: wordmarkRef.current,
                        start: "top 85%",
                    },
                });
            }

            gsap.from(payLetters, {
                y: 120,
                opacity: 0,
                rotateX: -40,
                duration: 1.2,
                stagger: 0.08,
                ease: "power4.out",
                delay: 0.2,
                scrollTrigger: {
                    trigger: wordmarkRef.current,
                    start: "top 85%",
                },
            });

            /* ── Tagline + columns reveal ── */
            gsap.from("[data-footer-reveal]", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: wordmarkRef.current,
                    start: "top 70%",
                },
            });
        }, footerRef);

        /* ── Mouse-tracking glow ── */
        const footer = footerRef.current;
        const glow = glowRef.current;
        if (!footer || !glow) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = footer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gsap.to(glow, {
                x: x - 400,
                y: y - 400,
                duration: 1.2,
                ease: "power2.out",
            });
        };

        footer.addEventListener("mousemove", handleMouseMove);
        return () => {
            ctx.revert();
            footer.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mounted]);

    return (
        <footer ref={footerRef} className="relative">

            {/* Scoped keyframes */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes footer-gradient-flow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes footer-line-flow {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                @keyframes footer-particle-float {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    15% { opacity: 0.25; }
                    85% { opacity: 0.08; }
                    100% { transform: translateY(-80px) scale(0.4); opacity: 0; }
                }
                @media (max-width: 767px) {
                    [data-pay-letter] {
                        transform: none !important;
                        margin-left: 0 !important;
                    }
                }
            `}} />

            {/* ─── Main footer card ─── */}
            <div className="relative bg-gradient-to-b from-[#041525] to-[#020D18] rounded-t-[3rem] overflow-hidden">

                {/* Animated top accent line — flows through all section colors */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                        background: "linear-gradient(90deg, transparent, #38BDF8, #FACC15, #A8E10C, #22D3EE, #D4A855, #38BDF8, transparent)",
                        backgroundSize: "200% 100%",
                        animation: "footer-line-flow 6s linear infinite",
                        opacity: 0.5,
                    }}
                />

                {/* Mouse-tracking glow orb */}
                <div
                    ref={glowRef}
                    className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
                    style={{
                        top: 0,
                        left: 0,
                        background: "radial-gradient(circle, #38BDF8, #A8E10C, transparent 70%)",
                        filter: "blur(80px)",
                        opacity: 0.04,
                    }}
                />

                {/* Floating ambient particles — fixed positions, no hydration mismatch */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {PARTICLES.map((p, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-white/10"
                            style={{
                                left: `${p.left}%`,
                                top: `${p.top}%`,
                                animationDelay: `${p.delay}s`,
                                animationDuration: `${p.dur}s`,
                                animationName: "footer-particle-float",
                                animationTimingFunction: "linear",
                                animationIterationCount: "infinite",
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-6 pt-16 pb-8 lg:pt-24 relative z-10">

                    {/* ─── MASSIVE WORDMARK with per-letter animation ─── */}
                    <div ref={wordmarkRef} className="mb-10 lg:mb-16" style={{ perspective: "800px" }}>
                        <Link href="/" className="block group" aria-label="EnviroPay Home">
                            <h2 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold font-[family-name:var(--font-outfit)] leading-none tracking-tighter select-none">
                                {/* "Enviro" — single span with flowing gradient */}
                                <span
                                    data-enviro-word
                                    className="inline-block transition-transform duration-500 group-hover:translate-y-[-6px]"
                                    style={{
                                        background: "linear-gradient(90deg, #38BDF8, #FACC15, #A8E10C, #22D3EE, #D4A855, #A8E10C, #38BDF8, #FACC15, #A8E10C)",
                                        backgroundSize: "300% 100%",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        animation: "footer-gradient-flow 8s ease-in-out infinite",
                                    }}
                                >
                                    Enviro
                                </span>
                                {/* "Pay" — per-letter staircase drop */}
                                <span className="inline-block">
                                    {"Pay".split("").map((letter, i) => {
                                        // Manual kerning to replace what inline-block breaks
                                        const kern = [0, -0.06, 0.05][i];
                                        return (
                                            <span
                                                key={i}
                                                data-pay-letter
                                                className="inline-block text-white/90 transition-transform duration-300 group-hover:translate-y-[-6px]"
                                                style={{
                                                    transitionDelay: `${i * 40}ms`,
                                                    transform: `translateY(${i * 0.12}em)`,
                                                    marginLeft: kern ? `${kern}em` : undefined,
                                                }}
                                            >
                                                {letter}
                                            </span>
                                        );
                                    })}
                                </span>
                            </h2>
                        </Link>

                        {/* Tagline */}
                        <p data-footer-reveal className="text-white/25 text-sm md:text-base leading-relaxed max-w-md mt-6 font-[family-name:var(--font-inter)]">
                            The UK&apos;s digital deposit-return platform. Scan, return, earn, and use — all from one wallet.
                        </p>
                    </div>

                    {/* ─── Grid: Info + Nav Columns ─── */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-14">

                        {/* Info Column */}
                        <div className="col-span-2" data-footer-reveal>
                            {/* Status indicator */}
                            <div className="flex items-center gap-2.5 mb-6">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8E10C] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A8E10C]" />
                                </span>
                                <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-white/40 tracking-wide">
                                    Coming 2027 · Ahead of UK DRS
                                </span>
                            </div>

                            {/* Address */}
                            <div className="text-xs text-white/15 leading-relaxed font-[family-name:var(--font-inter)]">
                                <p>EnviroPay Ltd.</p>
                                <p>7-75 Shelton St,</p>
                                <p>Covent Garden,</p>
                                <p>London, WC2H 9JQ</p>
                            </div>
                        </div>

                        {/* Nav Columns */}
                        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                            <div key={title} data-footer-reveal>
                                <h4 className="text-sm font-bold text-white/50 mb-5 font-[family-name:var(--font-outfit)] tracking-wide">
                                    {title}
                                </h4>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-white/25 hover:text-white/60 transition-colors duration-300 font-[family-name:var(--font-inter)] flex items-center gap-1 group/link"
                                                {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                            >
                                                {link.label}
                                                {"external" in link && link.external && (
                                                    <svg className="w-3 h-3 opacity-40 group-hover/link:opacity-70 transition-opacity" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                    </svg>
                                                )}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* ─── Bottom Bar ─── */}
                    <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-white/15 font-[family-name:var(--font-ibm-plex-mono)]">
                            © {new Date().getFullYear()} EnviroPay Ltd. All rights reserved.
                        </p>
                        <p className="text-xs text-white/10 font-[family-name:var(--font-ibm-plex-mono)] italic tracking-wide">
                            A world free from waste.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
