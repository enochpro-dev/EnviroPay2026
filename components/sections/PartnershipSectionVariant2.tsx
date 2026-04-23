"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Cpu, Factory, ShieldCheck } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TICKER_ITEMS = [
    "✅ RVM INTEGRATION LIVE", "NO MORE VOUCHERS", "#ACORECYCLING", "UK DRS 2027 READY",
    "END-TO-END DIGITAL PAYMENT", "WALLET CREDIT IN SECONDS", "30–40B CONTAINERS / YEAR",
    "✅ RVM INTEGRATION LIVE", "NO MORE VOUCHERS", "#ACORECYCLING", "UK DRS 2027 READY",
    "END-TO-END DIGITAL PAYMENT", "WALLET CREDIT IN SECONDS", "30–40B CONTAINERS / YEAR",
];

export function PartnershipSectionVariant2() {
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
            { threshold: 0.1 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const ctx = gsap.context(() => {
            gsap.from(".reveal-text", {
                y: 80, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            });
            gsap.from(".video-frame", {
                scale: 0.95, opacity: 0, duration: 1.5, ease: "expo.out",
                scrollTrigger: { trigger: ".video-frame", start: "top 85%" },
            });
            gsap.from(".data-block", {
                opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power2.out",
                scrollTrigger: { trigger: ".data-grid", start: "top 75%" },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section
            id="partnership-v2"
            ref={sectionRef}
            className="relative py-32 overflow-hidden bg-white"
        >
            {/* Label */}
            <div className="absolute top-0 left-0 z-50 font-bold px-5 py-2 rounded-br-xl text-xs tracking-wider"
                style={{ background: "#0B132B", color: "white" }}>
                VARIANT 2 · CINEMATIC APPLE-ESQUE
            </div>

            {/* Scoped keyframe */}
            <style dangerouslySetInnerHTML={{
                __html: `@keyframes v2-ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .v2-ticker { animation: v2-ticker 40s linear infinite; }`
            }} />

            {/* Huge, extremely blurred background gradient blobs - hallmark of premium stark design */}
            <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[150px] opacity-[0.05] pointer-events-none translate-x-1/3 -translate-y-1/3"
                style={{ background: "radial-gradient(circle, #00C9A7, transparent)" }} />
            <div className="absolute bottom-1/4 left-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-[0.05] pointer-events-none -translate-x-1/2"
                style={{ background: "radial-gradient(circle, #A8E10C, transparent)" }} />

            {/* Top ticker */}
            <div className="border-y border-[#F1F5F9] py-3 flex overflow-hidden mb-24 md:mb-32 relative z-10 bg-[#F8FAFC]/50 backdrop-blur-sm">
                <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
                <div className="v2-ticker flex items-center whitespace-nowrap">
                    {TICKER_ITEMS.map((item, i) => (
                        <span key={i} className="text-[10px] md:text-xs font-bold tracking-[0.25em] px-8 font-[family-name:var(--font-ibm-plex-mono)] text-[#64748B]">
                            {item} <span className="ml-8 text-[#CBD5E1]">|</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-[1600px] relative z-10">

                {/* Editorial Headline */}
                <div className="max-w-5xl mb-16 md:mb-24 px-2 md:px-4">
                    <p className="reveal-text font-bold tracking-widest uppercase text-[10px] sm:text-xs font-[family-name:var(--font-ibm-plex-mono)] mb-6 flex items-center gap-3 text-[#64748B]">
                        <span className="w-2 h-2 rounded-full border-2 border-[#00C9A7] animate-pulse" />
                        ACO Recycling / EnviroPay · Stage 1 Live
                    </p>
                    <h2 className="font-extrabold font-[family-name:var(--font-outfit)] tracking-tighter"
                        style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", lineHeight: 0.9 }}>
                        <span className="reveal-text inline-block text-[#0B132B]">HARDWARE</span><br />
                        <span className="reveal-text inline-block text-[#94A3B8] italic font-[family-name:var(--font-lora)] font-medium">meets</span><br />
                        <span className="reveal-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#A8E10C]">SOFTWARE.</span>
                    </h2>
                </div>

                {/* Cinematic Video Container */}
                <div className="px-2 md:px-4">
                    <div
                        className="video-frame relative w-full aspect-[4/5] sm:aspect-video rounded-3xl sm:rounded-[3rem] overflow-hidden"
                        style={{
                            boxShadow: "0 25px 50px -12px rgba(11,19,43,0.15), 0 0 0 1px rgba(11,19,43,0.05)",
                        }}
                    >
                        <video ref={videoRef} className="w-full h-full object-cover" muted loop playsInline preload="metadata">
                            <source src="/videos/enviropay-acorecycling-integration-video.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-[#0B132B]/10 to-transparent pointer-events-none" />

                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pointer-events-none">
                            <div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit mb-4 bg-white/20 backdrop-blur-md border border-white/30">
                                    <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest font-[family-name:var(--font-ibm-plex-mono)]">System Live Feed</span>
                                </div>
                                <h3 className="text-2xl sm:text-4xl font-light text-white font-[family-name:var(--font-outfit)] leading-tight max-w-lg">
                                    Reverse Vending Machines,<br />
                                    <strong className="font-bold">Powered by EnviroPay.</strong>
                                </h3>
                            </div>
                            <div className="hidden sm:block text-right bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-widest font-bold text-[#00C9A7]">DRS 2027</p>
                                <p className="text-sm font-semibold text-white mt-1">Status: Operational</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Grid */}
                <div className="data-grid mt-24 md:mt-32 pt-16 md:pt-24 relative px-2 md:px-4"
                    style={{ borderTop: "1px solid rgba(15,23,42,0.1)" }}>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                        <div className="md:col-span-4 lg:col-span-3">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-ibm-plex-mono)] mb-4 text-[#64748B]">System Architecture</h3>
                            <p className="text-2xl text-[#0B132B] font-medium leading-snug">The end of the paper voucher — for good.</p>
                        </div>

                        <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-12 md:pl-8 lg:pl-16 border-t md:border-t-0 md:border-l border-[#F1F5F9] md:pt-0 pt-12">

                            <div className="data-block space-y-5">
                                <div className="w-12 h-12 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center">
                                    <Cpu size={22} className="text-[#00C9A7]" />
                                </div>
                                <h4 className="text-[#0B132B] font-bold text-xl font-[family-name:var(--font-outfit)]">Instant Transmission</h4>
                                <p className="text-[#475569] text-base leading-relaxed">
                                    Machine deposits trigger a real-time API call mapping GBP credits directly to your EnviroWallet. No delays. No receipts.
                                </p>
                            </div>

                            <div className="data-block space-y-5">
                                <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                                    <Factory size={22} className="text-[#0B132B]" />
                                </div>
                                <h4 className="text-[#0B132B] font-bold text-xl font-[family-name:var(--font-outfit)]">Hardware Agnostic</h4>
                                <p className="text-[#475569] text-base leading-relaxed">
                                    Built for scale. The EnviroPay protocol interfaces with major RVM operators rolling out across the UK for DRS 2027.
                                </p>
                            </div>

                            <div className="data-block space-y-5">
                                <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                                    <ShieldCheck size={22} className="text-[#0B132B]" />
                                </div>
                                <h4 className="text-[#0B132B] font-bold text-xl font-[family-name:var(--font-outfit)]">Fraud-Resistant</h4>
                                <p className="text-[#475569] text-base leading-relaxed">
                                    Every scanned barcode is tied to a verified digital identity — eliminating voucher duplication and fraud at scale.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Footer */}
                <div className="mt-24 md:mt-40 mb-16 px-2 md:px-4">
                    <div className="bg-[#0B132B] rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                        {/* Glow inside the dark card */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2"
                            style={{ background: "radial-gradient(circle, #00C9A7, transparent)" }} />

                        <div className="z-10 text-center lg:text-left">
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-outfit)] max-w-xl leading-[1.1] mb-2 tracking-tight">
                                Prepared for the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A8E10C] to-[#00C9A7]">£6–8B scale.</span>
                            </h3>
                            <p className="text-white/70 font-medium text-lg mt-4">Explore the integration documentation or try the pilot.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto z-10 shrink-0">
                            <Link href="https://testflight.apple.com/join/enviropay" target="_blank"
                                className="group flex justify-center items-center gap-3 px-8 py-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 bg-gradient-to-r from-[#00C9A7] to-[#A8E10C] text-[#0B132B] font-[family-name:var(--font-ibm-plex-mono)]">
                                Try Pilot · Beta
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href="#get-involved"
                                className="group flex justify-center items-center gap-3 px-8 py-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all hover:bg-white/10 border border-white/20 text-white bg-white/5 font-[family-name:var(--font-ibm-plex-mono)] backdrop-blur-md">
                                Integration Docs
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
