"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Wallet, Map, BarChart3, Store, Repeat, ShieldCheck,
    Truck, Network, Zap, ArrowRight, Smartphone, CircleDollarSign,
    TrendingUp, Users, Globe, Leaf, QrCode, MapPin, PiggyBank
} from "lucide-react";
import { Accordion } from "@/components/shared/Accordion";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   ANIMATED COUNTER — counts up on scroll
   ═══════════════════════════════════════════════════ */
function AnimatedStat({ value, suffix = "", prefix = "", label }: { value: number; suffix?: string; prefix?: string; label: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [displayed, setDisplayed] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to({ val: 0 }, {
                        val: value,
                        duration: 1.8,
                        ease: "power2.out",
                        onUpdate: function () { setDisplayed(Math.round(this.targets()[0].val)); },
                    });
                },
            });
        });
        return () => ctx.revert();
    }, [value]);

    return (
        <div className="text-center">
            <span ref={ref} className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] text-white tracking-tight">
                {prefix}{displayed.toLocaleString()}{suffix}
            </span>
            <p className="text-white/40 text-sm mt-2 font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">{label}</p>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   MINI WALLET UI — live-feeling balance ticker
   ═══════════════════════════════════════════════════ */
function MiniWallet() {
    const [balance, setBalance] = useState(4.60);

    useEffect(() => {
        const interval = setInterval(() => {
            setBalance(prev => {
                const next = prev + 0.20;
                return next > 12 ? 0.20 : Number(next.toFixed(2));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 w-full">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-[family-name:var(--font-outfit)] font-bold text-[#FACC15] tracking-wider">EnviroWallet</span>
                <span className="w-2 h-2 rounded-full bg-[#A8E10C] animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-white font-[family-name:var(--font-outfit)] mb-1 transition-all duration-500">
                £{balance.toFixed(2)}
            </div>
            <div className="text-xs text-white/30">+£0.20 just now</div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   MINI MAP — animated dots for return points
   ═══════════════════════════════════════════════════ */
function MiniMap() {
    return (
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 relative overflow-hidden w-full aspect-square">
            <div className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-white/40 uppercase tracking-wider mb-3">Return Points Near You</div>
            {/* Fake map grid */}
            <div className="absolute inset-4 top-10">
                <div className="w-full h-full relative">
                    {/* Grid lines */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={`h${i}`} className="absolute left-0 right-0 border-t border-white/5" style={{ top: `${i * 25}%` }} />
                    ))}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={`v${i}`} className="absolute top-0 bottom-0 border-l border-white/5" style={{ left: `${i * 25}%` }} />
                    ))}
                    {/* Animated dots */}
                    {[
                        { top: '20%', left: '30%', delay: '0s' },
                        { top: '45%', left: '60%', delay: '0.5s' },
                        { top: '70%', left: '25%', delay: '1s' },
                        { top: '35%', left: '80%', delay: '1.5s' },
                        { top: '60%', left: '50%', delay: '0.8s' },
                    ].map((dot, i) => (
                        <div key={i} className="absolute" style={{ top: dot.top, left: dot.left }}>
                            <div className="relative">
                                <div className="w-3 h-3 rounded-full bg-[#FACC15] animate-ping absolute" style={{ animationDelay: dot.delay }} />
                                <div className="w-3 h-3 rounded-full bg-[#FACC15]" />
                            </div>
                        </div>
                    ))}
                    {/* User dot */}
                    <div className="absolute top-[50%] left-[45%]">
                        <div className="w-4 h-4 rounded-full bg-[#D4A855] border-2 border-white shadow-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   RETAILER DASHBOARD — mock KPI panel
   ═══════════════════════════════════════════════════ */
function RetailerDashboard() {
    return (
        <div className="bg-white rounded-[2rem] border border-[#CBD5E1]/50 shadow-premium p-6 w-full">
            <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-[#0B132B] font-[family-name:var(--font-outfit)]">Retailer Dashboard</span>
                <span className="text-[10px] font-[family-name:var(--font-ibm-plex-mono)] text-[#64748B] px-2 py-1 bg-[#F0F4F8] rounded-full">LIVE PREVIEW</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Returns today", value: "47", change: "+12%" },
                    { label: "Avg. time", value: "8s", change: "-3s" },
                    { label: "Satisfaction", value: "96%", change: "+4%" },
                ].map((kpi) => (
                    <div key={kpi.label} className="bg-[#F0F4F8] rounded-xl p-3">
                        <div className="text-xs text-[#64748B] mb-1">{kpi.label}</div>
                        <div className="text-xl font-bold text-[#0B132B] font-[family-name:var(--font-outfit)]">{kpi.value}</div>
                        <div className="text-[10px] text-[#D4A855] font-bold">{kpi.change}</div>
                    </div>
                ))}
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1.5 h-16">
                {[40, 55, 35, 65, 80, 60, 75, 90, 70, 85, 95, 47].map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all duration-500"
                        style={{
                            height: `${h}%`,
                            background: i === 11 ? '#D4A855' : '#CBD5E1',
                        }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-2">
                <span className="text-[9px] text-[#64748B]">6 AM</span>
                <span className="text-[9px] text-[#64748B]">Now</span>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT — 3 AUDIENCE SECTIONS
   ═══════════════════════════════════════════════════ */
export function AudienceSections() {
    const consumersRef = useRef<HTMLElement>(null);
    const retailersRef = useRef<HTMLElement>(null);
    const partnersRef = useRef<HTMLElement>(null);
    const [activePartner, setActivePartner] = useState(0);

    const PARTNER_TYPES = [
        { icon: Zap, title: "Investors", desc: "We're raising pre-seed to accelerate ahead of the UK's DRS launch. Fintech × circular economy × infrastructure.", accent: "#A8E10C" },
        { icon: Truck, title: "RVM Operators", desc: "Integrate EnviroPay as the digital payout layer for reverse vending machines. API-first, instant settlement.", accent: "#A8E10C" },
        { icon: Store, title: "Return Point Partners", desc: "Participate in the return network. Increase footfall, reduce friction, get DRS-ready early.", accent: "#D4A855" },
        { icon: Network, title: "Ecosystem Partners", desc: "Collaborate on interoperability, scheme compliance, and shared infrastructure standards.", accent: "#A8E10C" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Consumers bento entrance
            gsap.from("[data-bento-tile]", {
                y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: consumersRef.current, start: "top 70%" },
            });
            // Retailers entrance
            gsap.from("[data-retailer-item]", {
                y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
                scrollTrigger: { trigger: retailersRef.current, start: "top 70%" },
            });
            // Partners entrance
            gsap.from("[data-partner-item]", {
                y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: partnersRef.current, start: "top 70%" },
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* ═══════════════════════════════════════════
               CONSUMERS — Bento Grid App Preview
               ═══════════════════════════════════════════ */}
            <section id="consumers" ref={consumersRef} className="relative overflow-hidden min-h-screen">
                {/* ─── Full-section Background Image ─── */}
                <div className="absolute inset-0">
                    <img
                        src="/images/upscaled/consumer-return-urban.jpeg"
                        alt="Person scanning a bottle for recycling in a London park"
                        className="w-full h-full object-cover object-[center_30%]"
                    />

                    {/* Layer 1: Directional warm gradient — left opaque, right reveals image */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: [
                                "linear-gradient(to right, rgba(234,88,12,0.92) 0%, rgba(245,158,11,0.8) 30%, rgba(217,119,6,0.4) 55%, transparent 75%)",
                                "radial-gradient(ellipse 60% 80% at 20% 80%, rgba(245,158,11,0.5) 0%, transparent 60%)",
                                "radial-gradient(ellipse 40% 50% at 75% 30%, rgba(217,119,6,0.25) 0%, transparent 55%)",
                            ].join(", "),
                        }}
                    />

                    {/* Layer 1.5: Left-heavy dark scrim — text & component contrast */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(to right, rgba(180,60,10,0.75) 0%, rgba(180,60,10,0.45) 30%, rgba(180,60,10,0.1) 50%, transparent 65%)",
                        }}
                    />

                    {/* Layer 2: Animated light sweep — cinematic lens flare */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                            className="absolute w-[200px] h-[200%] animate-light-sweep"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), rgba(255,255,255,0.08), rgba(255,255,255,0.05), transparent)",
                                top: "-50%",
                                left: "0",
                            }}
                        />
                    </div>

                    {/* Layer 3: Floating bokeh orbs — atmospheric depth */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] rounded-full bg-[#FACC15] opacity-[0.08] blur-[120px] animate-float" />
                        <div className="absolute top-[40%] right-[20%] w-[200px] h-[200px] rounded-full bg-[#F97316] opacity-[0.06] blur-[100px] animate-float" style={{ animationDelay: "2s", animationDuration: "12s" }} />
                        <div className="absolute bottom-[15%] left-[40%] w-[250px] h-[250px] rounded-full bg-[#FCD34D] opacity-[0.07] blur-[130px] animate-float" style={{ animationDelay: "4s", animationDuration: "10s" }} />
                    </div>

                    {/* Layer 4: Top edge — deep amber warmth for nav contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#92400E]/40 to-transparent h-32" />
                    {/* Layer 5: Bottom edge — warm dark for section blend into Retailers */}
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#78350F]/70 to-transparent" />
                </div>

                {/* Content — left-aligned to leave the right side clear for the image */}
                <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
                    <div className="max-w-2xl lg:max-w-[55%]">
                        {/* Header */}
                        <div className="mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold tracking-wide mb-6 font-[family-name:var(--font-outfit)]">
                                <Smartphone size={14} /> EnviroPay App
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-outfit)] text-white leading-[1.05] tracking-tight mb-6 drop-shadow-lg">
                                For <span className="text-[#FACC15] italic font-[family-name:var(--font-lora)]">consumers</span>
                            </h2>
                            <p className="text-xl text-white/80 leading-relaxed drop-shadow-md">
                                One app, three moves: scan it, return it, spend it. Your refund hits your wallet before you leave the store.
                            </p>
                        </div>

                        {/* Bento Grid — app feature preview tiles */}
                        <div className="grid grid-cols-2 gap-4 lg:gap-5">
                            {/* Wallet tile — spans 2 cols */}
                            <div data-bento-tile className="col-span-2 row-span-1">
                                <MiniWallet />
                            </div>

                            {/* Feature tiles */}
                            <div data-bento-tile className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-[#FACC15]/40 transition-all duration-300 group">
                                <QrCode size={28} className="text-white mb-3 group-hover:scale-110 transition-transform" />
                                <h4 className="text-white font-bold text-sm font-[family-name:var(--font-outfit)] mb-1">Instant Scan</h4>
                                <p className="text-white/60 text-xs leading-relaxed">Point. Confirm. Done.</p>
                            </div>

                            <div data-bento-tile className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-[#FACC15]/40 transition-all duration-300 group">
                                <PiggyBank size={28} className="text-[#FACC15] mb-3 group-hover:scale-110 transition-transform" />
                                <h4 className="text-white font-bold text-sm font-[family-name:var(--font-outfit)] mb-1">Flexible Cash Out</h4>
                                <p className="text-white/60 text-xs leading-relaxed">Bank, spend, or donate.</p>
                            </div>

                            {/* Map tile — spans 2 cols */}
                            <div data-bento-tile className="col-span-2">
                                <MiniMap />
                            </div>

                            {/* Impact tile */}
                            <div data-bento-tile className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-[#FACC15]/40 transition-all duration-300 group">
                                <Leaf size={28} className="text-[#FACC15] mb-3 group-hover:scale-110 transition-transform" />
                                <h4 className="text-white font-bold text-sm font-[family-name:var(--font-outfit)] mb-1">Impact Score</h4>
                                <p className="text-white/60 text-xs leading-relaxed">Track your eco contribution.</p>
                            </div>

                            <div data-bento-tile className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-[#FACC15]/40 transition-all duration-300 group">
                                <MapPin size={28} className="text-white mb-3 group-hover:scale-110 transition-transform" />
                                <h4 className="text-white font-bold text-sm font-[family-name:var(--font-outfit)] mb-1">Find Returns</h4>
                                <p className="text-white/60 text-xs leading-relaxed">Nearest spot in seconds.</p>
                            </div>
                        </div>

                        {/* Stats bar */}
                        <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/30">
                            <AnimatedStat value={20} prefix="£0." suffix="" label="Per Container" />
                            <AnimatedStat value={500} suffix="+" label="Return Points" />
                            <AnimatedStat value={3} suffix="s" label="To Cash Out" />
                        </div>

                        {/* CTA */}
                        <div className="mt-12">
                            <a href="#contact-consumer" className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold bg-white text-[#F97316] shadow-lg hover:shadow-xl text-lg">
                                Join the Waitlist
                                <ArrowRight size={20} strokeWidth={3} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               RETAILERS — Dashboard + Before/After
               ═══════════════════════════════════════════ */}
            <section id="retailers" ref={retailersRef} className="py-24 lg:py-36 relative overflow-hidden bg-[#F0F4F8]">
                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                        {/* Left: Content */}
                        <div data-retailer-item>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B132B]/5 text-[#0B132B] text-sm font-bold tracking-wide mb-6 font-[family-name:var(--font-outfit)]">
                                <Store size={14} /> Retailer Dashboard
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-outfit)] text-[#0B132B] leading-[1.05] tracking-tight mb-6">
                                For <span className="text-[#D4A855] italic font-[family-name:var(--font-lora)]">retailers</span>
                            </h2>
                            <p className="text-xl text-[#64748B] leading-relaxed mb-10">
                                Be DRS-ready from day one. Drive footfall, reduce return friction, and see real-time performance — all from one dashboard.
                            </p>

                            {/* Before → After comparison */}
                            <div className="space-y-4 mb-10">
                                <div data-retailer-item className="flex gap-4">
                                    <div className="flex-1 bg-[#E2E8F0] rounded-2xl p-5 relative">
                                        <div className="absolute top-3 right-3 text-[9px] font-bold text-[#64748B] bg-white px-2 py-0.5 rounded-full">BEFORE</div>
                                        <p className="text-[#64748B] text-sm leading-relaxed mt-4">&ldquo;Sorry, our machine is broken. Try the next store.&rdquo;</p>
                                    </div>
                                    <div className="flex-1 bg-[#0B132B] rounded-2xl p-5 relative">
                                        <div className="absolute top-3 right-3 text-[9px] font-bold text-[#D4A855] bg-[#D4A855]/10 px-2 py-0.5 rounded-full">WITH ENVIROPAY</div>
                                        <p className="text-white/70 text-sm leading-relaxed mt-4">&ldquo;Drop it in the bin, refund&apos;s already in your wallet.&rdquo;</p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature list — new style */}
                            <div data-retailer-item className="space-y-4">
                                {[
                                    { icon: ShieldCheck, title: "DRS-compliant from launch", accent: "#D4A855" },
                                    { icon: Repeat, title: "Drive repeat visits with cashback", accent: "#D4A855" },
                                    { icon: BarChart3, title: "Real-time analytics & compliance reporting", accent: "#D4A855" },
                                ].map((f) => (
                                    <div key={f.title} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all" style={{ background: `${f.accent}15` }}>
                                            <f.icon size={18} style={{ color: f.accent }} />
                                        </div>
                                        <span className="text-[#0B132B] font-medium group-hover:translate-x-1 transition-transform">{f.title}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <a href="#contact-retailer" className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold bg-[#D4A855] text-[#0B132B] hover:bg-[#C49A48] shadow-lg text-lg">
                                    Talk to us about a pilot
                                    <ArrowRight size={20} strokeWidth={3} />
                                </a>
                            </div>
                        </div>

                        {/* Right: Retailer Portrait + Dashboard */}
                        <div data-retailer-item className="relative space-y-6">
                            {/* Shopkeeper portrait */}
                            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3]">
                                <img
                                    src="/images/upscaled/retail-store.jpeg"
                                    alt="UK shopkeeper in their sustainable store"
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#F0F4F8] via-transparent to-transparent opacity-60" />
                            </div>
                            {/* Dashboard below the portrait */}
                            <div className="relative">
                                <div className="absolute -inset-8 bg-[#D4A855]/5 rounded-[3rem] blur-xl" />
                                <div className="relative">
                                    <RetailerDashboard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               PARTNERS — Investor Thesis Layout
               ═══════════════════════════════════════════ */}
            <section id="partners" ref={partnersRef} className="py-24 lg:py-36 relative overflow-hidden bg-[#070D1F]">
                {/* Layer 1: Subtle line grid — fades into the top only */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(rgba(168,225,12,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168,225,12,0.06) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%)",
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%)",
                    }}
                />

                {/* Layer 2: Subtle dot grid — infrastructure/tech feel */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(168,225,12,0.4) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                {/* Layer 3: Multiple glow orbs — depth and warmth */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#A8E10C]/[0.04] blur-[150px] animate-float" style={{ animationDuration: "14s" }} />
                    <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] rounded-full bg-[#D4A855]/[0.03] blur-[120px] animate-float" style={{ animationDelay: "3s", animationDuration: "10s" }} />
                    <div className="absolute bottom-[-5%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#A8E10C]/[0.05] blur-[160px] animate-float" style={{ animationDelay: "6s", animationDuration: "16s" }} />
                </div>

                {/* Layer 4: Noise texture */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                <div className="container mx-auto px-6 relative z-10 text-white">
                    {/* Header */}
                    <div className="max-w-3xl mb-16" data-partner-item>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#A8E10C]/30 text-[#A8E10C] text-sm font-bold tracking-wide mb-6 font-[family-name:var(--font-outfit)]">
                            <Globe size={14} /> Network, Infrastructure & Investment
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-outfit)] leading-[1.05] tracking-tight mb-6">
                            For <span className="text-[#A8E10C] italic font-[family-name:var(--font-lora)]">partners</span> & <span className="text-[#A8E10C] italic font-[family-name:var(--font-lora)]">investors</span>
                        </h2>
                        <p className="text-xl text-white/40">
                            Build — or back — the connected deposit-return infrastructure the UK needs.
                        </p>
                    </div>

                    {/* Market Signal Stats */}
                    <div data-partner-item className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {[
                            { icon: CircleDollarSign, stat: "£1.6B", label: "UK DRS Market Size", accent: "#A8E10C" },
                            { icon: TrendingUp, stat: "2027", label: "UK DRS Launch Year", accent: "#A8E10C" },
                            { icon: Users, stat: "67M", label: "UK Population", accent: "#D4A855" },
                            { icon: Leaf, stat: "4.7B", label: "Containers / Year", accent: "#A8E10C" },
                        ].map((s) => (
                            <div key={s.label} className="bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group">
                                <s.icon size={20} style={{ color: s.accent }} className="mb-4 group-hover:scale-110 transition-transform" />
                                <div className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-outfit)] text-white mb-1">{s.stat}</div>
                                <div className="text-xs text-white/30 font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Partner types — interactive tabbed display */}
                    <div data-partner-item className="mb-16">
                        {/* Tab bar */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {PARTNER_TYPES.map((p, i) => {
                                const isActive = activePartner === i;
                                const TabIcon = p.icon;
                                return (
                                    <button
                                        key={p.title}
                                        onClick={() => setActivePartner(i)}
                                        className={`group flex items-center gap-2.5 px-5 py-3 rounded-xl font-[family-name:var(--font-outfit)] font-bold text-sm transition-all duration-300 border ${isActive
                                            ? "bg-white/[0.08] border-[#A8E10C]/40 text-white shadow-[0_0_20px_-5px_rgba(168,225,12,0.3)]"
                                            : "bg-transparent border-white/5 text-white/40 hover:text-white/70 hover:border-white/15"
                                            }`}
                                    >
                                        <TabIcon size={16} style={{ color: isActive ? p.accent : undefined }} className={!isActive ? "opacity-40 group-hover:opacity-70 transition-opacity" : "transition-opacity"} />
                                        <span>{p.title}</span>
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#A8E10C] animate-pulse ml-1" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content panel */}
                        <div className="bg-white/[0.03] rounded-[2rem] p-8 md:p-10 border border-white/5 relative overflow-hidden">
                            {/* Accent glow behind active content */}
                            <div
                                className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full blur-[100px] opacity-[0.06] pointer-events-none transition-colors duration-500"
                                style={{ background: PARTNER_TYPES[activePartner].accent }}
                            />
                            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                                {(() => {
                                    const ActiveIcon = PARTNER_TYPES[activePartner].icon;
                                    const active = PARTNER_TYPES[activePartner];
                                    return (
                                        <>
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300" style={{ background: `${active.accent}15` }}>
                                                <ActiveIcon size={26} style={{ color: active.accent }} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-outfit)] text-white mb-2">{active.title}</h3>
                                                <p className="text-white/50 leading-relaxed">{active.desc}</p>
                                            </div>
                                            <a
                                                href="#contact-partner"
                                                className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border border-white/10 text-white/70 hover:border-[#A8E10C]/40 hover:text-[#A8E10C] transition-all shrink-0"
                                            >
                                                Learn more
                                                <ArrowRight size={14} strokeWidth={3} />
                                            </a>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* Accordion Deep Dive */}
                    <div data-partner-item className="max-w-4xl mb-12">
                        <Accordion title="Learn more for partners & investors" className="border-white/10 text-white hover:text-[#A8E10C]">
                            <p className="text-white/50 mb-4">We&apos;re building for reliability, traceability, and real-world operations. If you operate return infrastructure or support DRS readiness, we&apos;d love to share what we&apos;re building and explore pilot paths together — from return verification to digital refund delivery.</p>
                            <p className="text-white/50">For investors: We&apos;re raising to accelerate development ahead of the UK&apos;s DRS launch. If you&apos;re interested in fintech, sustainability, or circular economy infrastructure, let&apos;s talk.</p>
                        </Accordion>
                    </div>

                    <a href="#contact-partner" className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg border-2 border-[#A8E10C] text-[#A8E10C] hover:bg-[#A8E10C] hover:text-[#070D1F] hover:shadow-[0_0_30px_-5px_#A8E10C] transition-all">
                        Partner or Invest with EnviroPay
                        <ArrowRight size={20} strokeWidth={3} />
                    </a>
                </div>
            </section>
        </>
    );
}
