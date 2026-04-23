"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TICKER_ROW_1 = [
    "✅ RVM Integration Live", "No More Vouchers", "#AcoRecyclingUK", "Partner Integration Complete", "End-to-End Digital Payment",
    "✅ RVM Integration Live", "No More Vouchers", "#AcoRecyclingUK", "Partner Integration Complete", "End-to-End Digital Payment",
];
const TICKER_ROW_2 = [
    "Digital Wallet Credit", "#DepositReturn", "30–40B Containers / Year", "UK DRS 2027 Ready", "#EnviroPay",
    "Digital Wallet Credit", "#DepositReturn", "30–40B Containers / Year", "UK DRS 2027 Ready", "#EnviroPay",
];

const PROOF_POINTS = [
    { icon: "📱", label: "Scan", desc: "Open EnviroPay, find your nearest ACO machine on EnviroMap, and scan the QR code." },
    { icon: "♻️", label: "Return", desc: "Drop your containers into the RVM. The machine reads and processes them instantly." },
    { icon: "💸", label: "Get Paid Digitally", desc: "Deposit credit hits your EnviroWallet in seconds. No vouchers. No store credit." },
];

const ROADMAP = [
    { label: "Partner Integration", done: true },
    { label: "Pilot · UK Deployment", done: false, active: true },
    { label: "National Rollout", done: false },
];

export function PartnershipSectionVariant1() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mq.matches);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || prefersReducedMotion) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) video.play().catch(() => {});
                else video.pause();
            },
            { threshold: 0.3 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const ctx = gsap.context(() => {
            gsap.from(".bento-box", {
                y: 40, opacity: 0, scale: 0.98,
                duration: 1, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section
            id="partnership-v1"
            ref={sectionRef}
            className="relative py-24 lg:py-32 overflow-hidden bg-[#F8FAFC]"
        >
            {/* Label */}
            <div className="absolute top-0 left-0 z-50 font-bold px-5 py-2 rounded-br-xl text-xs tracking-wider"
                style={{ background: "#0B132B", color: "white" }}>
                VARIANT 1 · PREMIUM BENTO
            </div>

            {/* Scoped keyframes */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes v1-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes v1-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
                .v1-marquee-l { animation: v1-left 45s linear infinite; }
                .v1-marquee-r { animation: v1-right 52s linear infinite; }
                .light-bento {
                    background: #FFFFFF;
                    border: 1px solid rgba(15, 23, 42, 0.06);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
                }
                `
            }} />

            <div className="container mx-auto px-6 relative z-10 pt-10">
                {/* Headline */}
                <div className="text-center mb-16 lg:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase font-[family-name:var(--font-ibm-plex-mono)] mb-6 bg-white border border-[#E2E8F0] text-[#0B132B] shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#A8E10C] animate-pulse" />
                        EnviroPay × ACO Recycling · Integration Complete
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-outfit)] leading-[1.05] tracking-tight text-[#0B132B] mb-5">
                        No Vouchers.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#A8E10C]">Just Digital Cash.</span>
                    </h2>
                    <p className="text-lg text-[#475569] font-medium max-w-2xl mx-auto leading-relaxed">
                        The UK's first fully-integrated ACO RVM payment system.
                        Insert a bottle, open your EnviroWallet, get paid instantly.
                    </p>
                </div>

                {/* Two-column */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                    {/* LEFT — Premium Phone Frame */}
                    <div className="flex justify-center">
                        <div
                            className="relative flex-shrink-0"
                            style={{
                                width: "clamp(280px, 38vw, 360px)",
                                filter: "drop-shadow(0 32px 56px rgba(0, 201, 167, 0.22))",
                            }}
                        >
                            <div
                                className="relative rounded-[3rem] md:rounded-[3.2rem] select-none"
                                style={{ aspectRatio: "9 / 19.5" }}
                            >
                                <div className="absolute inset-0 rounded-[3rem] md:rounded-[3.2rem] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.8),_0_0_0_1px_rgba(0,0,0,0.1)] ring-4 ring-neutral-200 bg-neutral-100" />
                                <div className="absolute inset-[3px] bg-black rounded-[2.8rem] md:rounded-[3rem] border-[6px] border-black" />
                                <div className="absolute inset-[9px] rounded-[2.5rem] md:rounded-[2.8rem] overflow-hidden bg-[#0B132B]">
                                    <video
                                        ref={videoRef}
                                        className="absolute inset-0 w-full h-full object-contain"
                                        muted loop playsInline preload="metadata"
                                    >
                                        <source src="/videos/enviropay-acorecycling-integration-video.mp4" type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay z-10" />
                                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/15">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                                        <span className="text-[9px] font-bold text-white tracking-widest uppercase font-[family-name:var(--font-ibm-plex-mono)]">Live</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Editorial (from V0) */}
                    <div className="flex flex-col gap-8">

                        {/* 3 proof points */}
                        <div className="flex flex-col gap-3">
                            {PROOF_POINTS.map(({ icon, label, desc }) => (
                                <div key={label} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[rgba(15,23,42,0.06)] shadow-sm transition-shadow hover:shadow-md">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#00C9A7] to-[#0A8771] text-white text-lg shadow-md shadow-[#00C9A7]/20">
                                        {icon}
                                    </div>
                                    <div>
                                        <p className="text-[#0B132B] font-bold mb-1">{label}</p>
                                        <p className="text-[#475569] text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Roadmap */}
                        <div className="flex flex-col gap-2 bg-white p-5 rounded-2xl border border-[rgba(15,23,42,0.06)] shadow-sm">
                            {ROADMAP.map(({ label, done, active }) => (
                                <div key={label} className="flex items-center gap-3">
                                    {done ? (
                                        <CheckCircle2 size={16} className="text-[#00C9A7] flex-shrink-0" />
                                    ) : active ? (
                                        <div className="w-4 h-4 rounded-full border-2 border-[#00C9A7] flex items-center justify-center flex-shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00C9A7] animate-pulse" />
                                        </div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] flex-shrink-0" />
                                    )}
                                    <span className={`text-sm font-semibold ${done ? "text-[#0B132B]" : active ? "text-[#0B132B]" : "text-[#94A3B8]"}`}>
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link href="https://testflight.apple.com/join/enviropay" target="_blank"
                                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] bg-gradient-to-r from-[#00C9A7] to-[#A8E10C] text-[#0B132B] shadow-lg shadow-[#00C9A7]/25">
                                Try the Beta
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <a href="#get-involved"
                                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:bg-gray-50 bg-white border border-[#E2E8F0] text-[#0B132B] shadow-sm">
                                Explore Integration
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticker */}
            <div className="mt-20 relative overflow-hidden py-4 border-t border-[#E2E8F0]">
                <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#F8FAFC] to-transparent" />
                <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#F8FAFC] to-transparent" />
                <div className="v1-marquee-l flex items-center gap-0 whitespace-nowrap">
                    {[...TICKER_ROW_1, ...TICKER_ROW_1].map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-ibm-plex-mono)] px-8 text-[#0B132B]">
                            {item} <span className="text-[#00C9A7]">·</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
