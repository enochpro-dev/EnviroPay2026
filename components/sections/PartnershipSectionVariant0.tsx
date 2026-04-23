"use client";

import { useRef, useEffect, useState } from "react";
import { Scan, RotateCcw, Wallet, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

const TICKER_ITEMS = [
    "#AcoRecyclingUK", "RVM Integration Live", "No Vouchers",
    "Digital Wallet Credit", "#DRS2027", "Stage 1 Pilot Complete",
    "30–40B Containers/yr", "#DepositReturn", "#EnviroPay", "Machine-Integrated",
    "#AcoRecyclingUK", "RVM Integration Live", "No Vouchers",
    "Digital Wallet Credit", "#DRS2027", "Stage 1 Pilot Complete",
    "30–40B Containers/yr", "#DepositReturn", "#EnviroPay", "Machine-Integrated",
];

const PROOF_POINTS = [
    {
        icon: <Scan size={20} />,
        label: "Scan",
        desc: "ACO RVM machine reads your container and triggers instant verification.",
    },
    {
        icon: <RotateCcw size={20} />,
        label: "Return",
        desc: "End-to-end machine integration — no paper receipt, no waiting in line.",
    },
    {
        icon: <Wallet size={20} />,
        label: "Get Paid Digitally",
        desc: "Your deposit credit hits your EnviroWallet in seconds. Spend it anywhere.",
    },
];

const ROADMAP = [
    { label: "Partner Integration", done: true },
    { label: "Pilot · UK Deployment", done: false, active: true },
    { label: "National Rollout", done: false },
];

export function PartnershipSectionVariant0() {
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

    return (
        <section
            id="partnership-v0"
            className="relative py-24 lg:py-32 overflow-hidden bg-white"
        >
            {/* Ticker keyframe */}
            <style dangerouslySetInnerHTML={{
                __html: `@keyframes v0-ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } @keyframes v0-ticker-r { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } } .v0-ticker-track { animation: v0-ticker 50s linear infinite; } .v0-ticker-track-r { animation: v0-ticker-r 58s linear infinite; }`
            }} />

            {/* Very subtle glow behind the phone */}
            <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.04]"
                style={{ background: "linear-gradient(135deg, #00C9A7, #A8E10C)" }} />

            <div className="container mx-auto px-6 relative z-10">

                {/* Headline — copied from V1 */}
                <div className="text-center mb-16 lg:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase font-[family-name:var(--font-ibm-plex-mono)] mb-6 bg-white border border-[#E2E8F0] text-[#0B132B] shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#A8E10C] animate-pulse" />
                        EnviroPay × ACO Recycling · Integration Complete
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-outfit)] leading-[1.05] tracking-tight text-[#0B132B] mb-5">
                        Live. Tested.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#A8E10C]">Proven.</span>
                    </h2>
                    <p className="text-lg text-[#475569] font-medium max-w-2xl mx-auto leading-relaxed">
                        EnviroPay and ACO Recycling are leading the UK Deposit Return Scheme into the digital age. No more vouchers — just instant digital cash in your pocket.
                    </p>
                </div>

                {/* Two-column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-6xl mx-auto">

                    {/* LEFT — Premium Phone Frame (same as ProtocolSection) */}
                    <div className="flex justify-center">
                        <div
                            className="relative flex-shrink-0"
                            style={{
                                width: "clamp(280px, 38vw, 360px)",
                                filter: "drop-shadow(0 32px 56px rgba(0, 201, 167, 0.22))",
                            }}
                        >
                            {/* Device shell */}
                            <div
                                className="relative rounded-[3rem] md:rounded-[3.2rem] select-none"
                                style={{ aspectRatio: "9 / 19.5" }}
                            >
                                {/* 1. Outer Metallic Ring (Silver Titanium) */}
                                <div className="absolute inset-0 rounded-[3rem] md:rounded-[3.2rem] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.8),_0_0_0_1px_rgba(0,0,0,0.1)] ring-4 ring-neutral-200 bg-neutral-100" />
                                {/* 2. Inner Bezel (Black Glass Edge) */}
                                <div className="absolute inset-[3px] bg-black rounded-[2.8rem] md:rounded-[3rem] border-[6px] border-black" />

                                {/* 3. Screen — video fills like screenshots do in ProtocolSection */}
                                <div className="absolute inset-[9px] rounded-[2.5rem] md:rounded-[2.8rem] overflow-hidden bg-[#0B132B]">
                                    <video
                                        ref={videoRef}
                                        className="absolute inset-0 w-full h-full object-contain"
                                        muted loop playsInline preload="metadata"
                                    >
                                        <source src="/videos/enviropay-acorecycling-integration-video.mp4" type="video/mp4" />
                                    </video>
                                    {/* Glass reflection overlay — same as ProtocolSection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay z-10" />

                                    {/* Live badge */}
                                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/15">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                                        <span className="text-[9px] font-bold text-white tracking-widest uppercase font-[family-name:var(--font-ibm-plex-mono)]">Live</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Bento cards (from V1) */}
                    <div className="flex flex-col gap-5">

                        {/* Instant Read */}
                        <div className="rounded-[2rem] p-7 flex flex-col justify-between relative overflow-hidden bg-white border border-[rgba(15,23,42,0.06)] shadow-sm">
                            <div className="absolute top-0 right-0 w-48 h-48 rounded-full translate-x-1/3 -translate-y-1/3 opacity-20 blur-[40px] bg-gradient-to-br from-[#00C9A7] to-[#A8E10C]" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-[#F0FDF4] border border-[#DCFCE7]">
                                    <Zap className="text-[#00C9A7]" size={22} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0B132B] mb-2 font-[family-name:var(--font-outfit)]">Instant Read</h3>
                                <p className="text-[#475569] leading-relaxed text-sm font-medium">
                                    ACO RVM verifies your container and transmits the deposit credit to your EnviroWallet in seconds — no receipt needed.
                                </p>
                            </div>
                        </div>

                        {/* Before & After */}
                        <div className="rounded-[2rem] p-7 relative flex flex-col justify-center bg-white border border-[rgba(15,23,42,0.06)] shadow-sm">
                            <div className="flex justify-between w-full">
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3 font-[family-name:var(--font-ibm-plex-mono)]">Yesterday</p>
                                    <p className="text-base text-[#64748B] font-medium line-through decoration-[#EF4444]/60 decoration-2 mb-2">Paper Vouchers</p>
                                    <p className="text-base text-[#64748B] font-medium line-through decoration-[#EF4444]/60 decoration-2">Store Credits Only</p>
                                </div>
                                <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#E2E8F0] to-transparent mx-4" />
                                <div className="flex-1 pl-4">
                                    <p className="text-[10px] font-bold text-[#00C9A7] uppercase tracking-widest mb-3 font-[family-name:var(--font-ibm-plex-mono)]">Today</p>
                                    <p className="text-base text-[#0B132B] font-bold flex items-center gap-2 mb-2">
                                        <CheckCircle2 size={16} className="text-[#00C9A7]" /> Digital Cash
                                    </p>
                                    <p className="text-base text-[#0B132B] font-bold flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-[#00C9A7]" /> Spend Anywhere
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* UK's First */}
                        <div className="rounded-[2rem] p-7 flex flex-col justify-between overflow-hidden relative bg-white border border-[rgba(15,23,42,0.06)] shadow-sm">
                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-[#00C9A7] uppercase tracking-widest mb-2 font-[family-name:var(--font-ibm-plex-mono)]">Live RVM Integration</p>
                                <h3 className="text-4xl font-bold font-[family-name:var(--font-outfit)] tracking-tight text-[#0B132B] leading-tight">UK's<br />first.</h3>
                                <p className="text-[#475569] font-medium mt-2 text-sm leading-relaxed">Digital payment integration with a live RVM partner.</p>
                            </div>
                            <div className="h-2 w-full rounded-full overflow-hidden bg-[#F1F5F9] mt-5 relative z-10">
                                <div className="h-full w-full rounded-full bg-gradient-to-r from-[#00C9A7] to-[#A8E10C]" />
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 pt-1">
                            <Link href="https://testflight.apple.com/join/enviropay" target="_blank"
                                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] bg-gradient-to-r from-[#00C9A7] to-[#A8E10C] text-[#0B132B] shadow-lg shadow-[#00C9A7]/25">
                                Try the Beta
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <a href="#contact-partner"
                                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:bg-gray-50 bg-white border border-[#E2E8F0] text-[#0B132B] shadow-sm">
                                Explore Integration
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>{/* end two-col grid */}
            </div>{/* end container */}

            {/* Dual tickers — full bleed */}
            <div className="mt-20 relative flex flex-col gap-3 py-6 border-y border-[#F1F5F9] overflow-hidden bg-[#F8FAFC]">
                <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-[#F8FAFC] to-transparent" />
                <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-[#F8FAFC] to-transparent" />

                <div className="flex">
                    <div className="v0-ticker-track flex items-center gap-8 whitespace-nowrap">
                        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                            <span key={i} className="text-xs font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-ibm-plex-mono)] text-[#0B132B]">
                                {item} <span className="ml-8 text-[#00C9A7]">/</span>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex">
                    <div className="v0-ticker-track-r flex items-center gap-8 whitespace-nowrap">
                        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                            <span key={i} className="text-xs font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-ibm-plex-mono)] text-[#64748B]">
                                {item} <span className="ml-8 text-[#CBD5E1]">/</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
