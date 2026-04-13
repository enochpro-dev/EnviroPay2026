"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Target, Eye, Plus, Minus, Cpu, Zap, ArrowRight, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function AnimNum({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }) {
    const ref = React.useRef<HTMLSpanElement>(null);
    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: value,
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: () => {
                el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
            },
        });
    }, [value, suffix, prefix]);
    return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function WhySection() {
    const sectionRef = React.useRef<HTMLElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedMember, setSelectedMember] = React.useState<number | null>(null);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>("[data-why-reveal]").forEach((el) => {
                gsap.from(el, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 85%" },
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="why" ref={sectionRef} className="py-32 lg:py-44 relative overflow-hidden bg-[#062B2B]">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="/images/upscaled/uk-green-cityscape.jpeg"
                    alt=""
                    className="w-full h-full object-cover scale-110 blur-[0.5px]"
                />
            </div>
            {/* Vertical overlay — skyline shows at top, fades for content below */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#062B2B]/35 via-[#062B2B]/85 to-[#062B2B]/96" />
            {/* Left scrim — header text contrast */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to right, rgba(6,43,43,0.6) 0%, rgba(6,43,43,0.3) 40%, transparent 65%)",
                }}
            />
            <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-[#00C9A7]/5 rounded-full blur-[160px] pointer-events-none -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D4A855]/5 rounded-full blur-[140px] pointer-events-none translate-x-1/3" />

            <div className="container mx-auto px-6 relative z-10">

                {/* ─── EDITORIAL HEADER ─── */}
                <div data-why-reveal className="max-w-4xl mb-24">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00C9A7]/30 bg-[#00C9A7]/10 text-[#00C9A7] text-sm font-bold tracking-wide mb-8 font-[family-name:var(--font-outfit)]">
                        <Target size={14} /> Our Mission
                    </span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-outfit)] text-white leading-[0.9] tracking-tight mb-8">
                        Recycling<br />
                        <span className="text-white/15 italic font-[family-name:var(--font-lora)]">reimagined</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#A8E10C]">for real life.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl">
                        We&apos;re building the digital layer for the UK&apos;s deposit return scheme. Simple, transparent, and rewarding.
                    </p>
                </div>

                {/* ─── THREE PILLARS — Horizontal Card Stack ─── */}
                <div className="grid md:grid-cols-3 gap-0 mb-24">
                    {[
                        {
                            icon: Clock,
                            title: "The moment",
                            desc: "The UK is approaching a major shift in how drinks containers are returned.",
                            accent: "#00C9A7",
                            num: 2027,
                            numLabel: "UK DRS target",
                        },
                        {
                            icon: Target,
                            title: "The gap",
                            desc: "Billions in deposits still processed via paper vouchers, printed receipts and cash payout machines.",
                            accent: "#D4A855",
                            num: 6,
                            numLabel: "circulating deposits",
                            numSuffix: "B+",
                            numPrefix: "£",
                        },
                        {
                            icon: Eye,
                            title: "The vision",
                            desc: "Make recycling feel as normal as buying a drink: simple, rewarding, and built into daily life.",
                            accent: "#A8E10C",
                            num: 30,
                            numLabel: "B+ containers / year",
                            numSuffix: "B+",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            data-why-reveal
                            className="group relative p-8 md:p-10 border-t border-white/10 md:border-t-0 md:border-l first:border-l-0 first:border-t-0"
                        >
                            {/* Number */}
                            <div className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-outfit)] mb-4 tracking-tight" style={{ color: item.accent }}>
                                <AnimNum value={item.num} suffix={item.numSuffix || ""} prefix={item.numPrefix || ""} />
                            </div>
                            <p className="text-[10px] font-[family-name:var(--font-ibm-plex-mono)] text-white/40 uppercase tracking-widest mb-6">{item.numLabel}</p>

                            {/* Icon + Title */}
                            <div className="flex items-center gap-3 mb-4">
                                <item.icon size={18} style={{ color: item.accent }} />
                                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-outfit)]">{item.title}</h3>
                            </div>
                            <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/70 transition-colors">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ─── DEEP DIVE TOGGLE ─── */}
                <div data-why-reveal className="border-t border-white/10 pt-12 mb-24">
                    <button onClick={() => setIsOpen(!isOpen)} className="group w-full text-left">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-outfit)] font-bold text-white group-hover:text-[#00C9A7] transition-colors">
                                    Read why we exist
                                </h3>
                                <p className="mt-2 text-white/40 text-lg max-w-xl group-hover:text-white/60 transition-colors">
                                    Platform, purpose, and the data behind our approach.
                                </p>
                            </div>
                            <span className={`
                                w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0
                                group-hover:bg-[#00C9A7] group-hover:text-white group-hover:border-[#00C9A7] transition-all duration-300
                                ${isOpen ? 'rotate-180' : ''}
                            `}>
                                {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                            </span>
                        </div>
                    </button>

                    <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr] opacity-100 pt-12" : "grid-rows-[0fr] opacity-0 pt-0"}`}>
                        <div className="overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: Cpu,
                                        label: "The platform",
                                        content: "EnviroPay is a UK-based digital platform designed to simplify the deposit return process for bottles and cans. We're building a seamless app experience that connects consumers, retailers, and reverse vending infrastructure through one unified journey.",
                                        accent: "#00C9A7",
                                    },
                                    {
                                        icon: Zap,
                                        label: "Our purpose",
                                        content: "The upcoming deposit return scheme will create the framework for a nationwide shift in how drinks containers are handled — but the return experience must be convenient and trustworthy to succeed. EnviroPay exists to turn that legislative opportunity into real, everyday action.",
                                        accent: "#D4A855",
                                    },
                                    {
                                        icon: ArrowRight,
                                        label: "Community proof",
                                        content: "We asked the UK what people would want from a digital deposit return experience. The response was clear: convenience wins, choice matters, and trust matters most.",
                                        accent: "#A8E10C",
                                    },
                                    {
                                        icon: Eye,
                                        label: "Network vision",
                                        content: "By creating a transparent, connected deposit-return network, EnviroPay aims to support the UK's upcoming DRS and make recycling easier, faster, and more rewarding for everyone involved.",
                                        accent: "#00C9A7",
                                    },
                                ].map((card) => (
                                    <div key={card.label} className="bg-white/[0.05] backdrop-blur-sm p-8 rounded-[2rem] border border-white/10 hover:border-[#00C9A7]/30 hover:shadow-lg transition-all">
                                        <div className="flex items-center gap-3 mb-4">
                                            <card.icon size={18} style={{ color: card.accent }} />
                                            <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest" style={{ color: card.accent }}>{card.label}</span>
                                        </div>
                                        <p className="text-white/60 leading-relaxed">{card.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════
                   THE TEAM — Editorial Portraits
                   ═══════════════════════════════════════════ */}
                <div data-why-reveal className="pt-16 border-t border-white/10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
                        <div>
                            <h4 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-outfit)] text-white tracking-tight mb-2">
                                The people behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#A8E10C] italic font-[family-name:var(--font-lora)]">EnviroPay</span>
                            </h4>
                            <p className="text-white/40 text-sm max-w-md">Four founders. One shared conviction: recycling should be as easy as buying a drink.</p>
                        </div>
                        <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-white/30 uppercase tracking-widest">Founding Team</span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                        {[
                            {
                                name: "Josh Illingworth",
                                role: "CEO & Co-Founder",
                                focus: "Strategy & Product",
                                desc: "12+ years in app development and product design. Leading EnviroPay's vision and execution.",
                                bio: "Josh brings over 12 years of experience in app development, product design, and strategic leadership. As CEO, he drives EnviroPay's vision — from fundraising and partnerships to product roadmap and market strategy. His background spans fintech startups and enterprise software, giving him a rare ability to bridge technical complexity with business outcomes. Josh sets the direction and ensures every decision moves the mission forward.",
                                photo: "/images/team/pfp-Josh.jpeg",
                                accent: "#D4A855",
                            },
                            {
                                name: "Daniel Joseph Thomas",
                                role: "COO & Co-Founder",
                                focus: "Operations & Growth",
                                desc: "Deep expertise in sustainability and circular economy. Driving operational excellence.",
                                bio: "Daniel brings deep expertise in sustainability, circular economy infrastructure, and operational strategy. As COO, he drives the day-to-day execution of EnviroPay's roadmap — from partner onboarding and government engagement to scaling operations across the UK's deposit return ecosystem. His sharp operational thinking and passion for environmental impact ensure EnviroPay delivers on its mission at scale.",
                                photo: "/images/team/pfp-Daniel.jpeg",
                                accent: "#00C9A7",
                            },
                            {
                                name: "Dannell Kobby",
                                role: "CTO & Co-Founder",
                                focus: "Architecture & MVP",
                                desc: "10+ years across fintech, insurance, and AI. Building the technical foundation.",
                                bio: "Dannell is a senior full-stack engineer and co-founder with over 10 years of experience spanning fintech, insurance platforms, and AI-powered systems. As CTO, he architects EnviroPay's technical foundation — from the real-time transaction layer to the API infrastructure that connects consumers, retailers, and reverse vending machines. His code is the backbone: scalable, secure, and built to handle millions of deposit returns.",
                                photo: "/images/team/pfp-Dannell.jpeg",
                                accent: "#A8E10C",
                            },
                            {
                                name: "Enoch Offei",
                                role: "CPO & Co-Founder",
                                focus: "Product Design & Brand",
                                desc: "Nearly 10 years in fintech and digital wallets. Designing the end-to-end experience.",
                                bio: "Enoch is a co-founder with nearly 10 years of experience designing digital products in fintech, digital wallets, and consumer platforms. As Chief Design Officer, he owns the end-to-end user experience — from the first scan to the final payout. His design philosophy centres on making complex infrastructure feel effortless. Every screen, interaction, and animation in EnviroPay is crafted to make recycling feel as seamless as buying a coffee.",
                                photo: "/images/team/pfp-Enoch.jpeg",
                                accent: "#00C9A7",
                            },
                        ].map((member, idx) => (
                            <div
                                key={member.name}
                                className="group relative overflow-hidden rounded-[1.5rem] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                                onClick={() => setSelectedMember(idx)}
                            >
                                {/* Photo — full color, no grayscale */}
                                <div className="aspect-[3/4] w-full relative overflow-hidden rounded-[1.5rem]">
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Cinematic gradient overlay — deepens on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#062B2B] via-[#062B2B]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                                    {/* Accent bar — left edge signature */}
                                    <div
                                        className="absolute top-6 bottom-6 left-0 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 -translate-x-1"
                                        style={{ background: member.accent }}
                                    />

                                    {/* Content — bottom overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        {/* Role label */}
                                        <p
                                            className="text-[9px] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-[0.2em] mb-2 opacity-70"
                                            style={{ color: member.accent }}
                                        >
                                            {member.focus}
                                        </p>
                                        {/* Name */}
                                        <h5 className="text-white font-bold text-base md:text-lg font-[family-name:var(--font-outfit)] leading-tight mb-1">
                                            {member.name}
                                        </h5>
                                        {/* Role */}
                                        <p className="text-white/30 text-xs font-[family-name:var(--font-ibm-plex-mono)] mb-3">
                                            {member.role}
                                        </p>
                                        {/* Learn more button — appears on hover */}
                                        <button
                                            className="flex items-center gap-1.5 text-[11px] font-bold font-[family-name:var(--font-outfit)] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out"
                                            style={{ color: member.accent }}
                                            onClick={(e) => { e.stopPropagation(); setSelectedMember(idx); }}
                                        >
                                            Learn more
                                            <ArrowRight size={12} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ─── Detail Card Overlay ─── */}
                    {selectedMember !== null && (() => {
                        const MEMBERS = [
                            { name: "Josh Illingworth", role: "CEO & Co-Founder", focus: "Strategy & Product", bio: "Josh brings over 12 years of experience in app development, product design, and strategic leadership. As CEO, he drives EnviroPay's vision — from fundraising and partnerships to product roadmap and market strategy. His background spans fintech startups and enterprise software, giving him a rare ability to bridge technical complexity with business outcomes. Josh sets the direction and ensures every decision moves the mission forward.", photo: "/images/team/pfp-Josh.jpeg", accent: "#D4A855" },
                            { name: "Daniel Joseph Thomas", role: "COO & Co-Founder", focus: "Operations & Growth", bio: "Daniel brings deep expertise in sustainability, circular economy infrastructure, and operational strategy. As COO, he drives the day-to-day execution of EnviroPay's roadmap — from partner onboarding and government engagement to scaling operations across the UK's deposit return ecosystem. His sharp operational thinking and passion for environmental impact ensure EnviroPay delivers on its mission at scale.", photo: "/images/team/pfp-Daniel.jpeg", accent: "#00C9A7" },
                            { name: "Dannell Kobby", role: "CTO & Co-Founder", focus: "Architecture & MVP", bio: "Dannell is a senior full-stack engineer and co-founder with over 10 years of experience spanning fintech, insurance platforms, and AI-powered systems. As CTO, he architects EnviroPay's technical foundation — from the real-time transaction layer to the API infrastructure that connects consumers, retailers, and reverse vending machines. His code is the backbone: scalable, secure, and built to handle millions of deposit returns.", photo: "/images/team/pfp-Dannell.jpeg", accent: "#A8E10C" },
                            { name: "Enoch Offei", role: "CPO & Co-Founder", focus: "Product Design & Brand", bio: "Enoch is a co-founder with nearly 10 years of experience designing digital products in fintech, digital wallets, and consumer platforms. As Chief Product Officer, he owns the end-to-end user experience — from the first scan to the final payout. His design philosophy centres on making complex infrastructure feel effortless. Every screen, interaction, and animation in EnviroPay is crafted to make recycling feel as seamless as buying a coffee.", photo: "/images/team/pfp-Enoch.jpeg", accent: "#00C9A7" },
                        ];
                        const m = MEMBERS[selectedMember];
                        return (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                                onClick={() => setSelectedMember(null)}
                            >
                                {/* Backdrop */}
                                <div className="absolute inset-0 bg-[#062B2B]/80 backdrop-blur-md" />

                                {/* Detail card */}
                                <div
                                    className="relative w-full max-w-lg bg-[#0a3535] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl animate-[fadeIn_0.3s_ease-out]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Photo header */}
                                    <div className="relative h-56 md:h-72 overflow-hidden">
                                        <img
                                            src={m.photo}
                                            alt={m.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a3535] via-[#0a3535]/40 to-transparent" />

                                        {/* Back button */}
                                        <button
                                            onClick={() => setSelectedMember(null)}
                                            className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs font-bold font-[family-name:var(--font-outfit)] hover:bg-white/20 transition-all"
                                        >
                                            <ArrowLeft size={14} />
                                            Back
                                        </button>

                                        {/* Accent bar */}
                                        <div
                                            className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full"
                                            style={{ background: `linear-gradient(to right, ${m.accent}, transparent)` }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8">
                                        <p
                                            className="text-[10px] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-[0.2em] mb-2"
                                            style={{ color: m.accent }}
                                        >
                                            {m.focus}
                                        </p>
                                        <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-outfit)] text-white mb-1">
                                            {m.name}
                                        </h3>
                                        <p className="text-white/30 text-sm font-[family-name:var(--font-ibm-plex-mono)] mb-6">
                                            {m.role}
                                        </p>
                                        <p className="text-white/60 leading-relaxed text-sm">
                                            {m.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </section>
    );
}
