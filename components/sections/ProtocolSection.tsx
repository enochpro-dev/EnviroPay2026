"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROTOCOL_STEPS = [
    {
        id: "protocol-scan",
        step: "01",
        title: "Scan",
        description: "Point your phone at any DRS-eligible container. Our scanner reads the barcode and confirms the deposit value instantly.",
        animation: "recycle",
        bg: "bg-gradient-to-br from-[#FACC15] to-[#F97316]",
        textColor: "text-[#0B132B]",
        subtextColor: "text-[#0B132B]/70",
        stepColor: "text-[#0B132B]/40",
    },
    {
        id: "protocol-return",
        step: "02",
        title: "Return",
        description: "Find your nearest EnviroPoint — a reverse vending machine, participating retailer, or collection hub. Drop and go.",
        animation: "scanner",
        bg: "bg-gradient-to-br from-[#A8E10C] to-[#00C9A7]",
        textColor: "text-[#0B132B]",
        subtextColor: "text-[#0B132B]/70",
        stepColor: "text-[#0B132B]/40",
    },
    {
        id: "protocol-earn",
        step: "03",
        title: "Earn",
        description: "Your refund hits your EnviroWallet in seconds. Transfer to your bank, spend at partner stores, or donate to environmental causes.",
        animation: "wallet",
        bg: "bg-gradient-to-br from-[#22D3EE] to-[#00C9A7]",
        textColor: "text-[#0B132B]",
        subtextColor: "text-[#0B132B]/70",
        stepColor: "text-[#0B132B]/40",
    },
];

/* Simple SVG animations for each card */
function RecycleMotif() {
    return (
        <svg className="w-32 h-32 animate-[spin_20s_linear_infinite] opacity-20" viewBox="0 0 100 100" fill="none">
            <path d="M50 15 L65 40 L35 40Z" stroke="#0B132B" strokeWidth="2" />
            <path d="M65 40 L80 70 L50 70Z" stroke="#0B132B" strokeWidth="2" />
            <path d="M35 40 L50 70 L20 70Z" stroke="#0B132B" strokeWidth="2" />
            <circle cx="50" cy="50" r="30" stroke="#0B132B" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
    );
}

function ScannerLine() {
    return (
        <div className="relative w-32 h-32 opacity-20">
            {/* Grid of dots */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-2">
                {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0B132B]/30" />
                ))}
            </div>
            {/* Scanning line */}
            <div className="absolute left-0 right-0 h-[2px] bg-[#0B132B]/60 animate-[scanner_3s_ease-in-out_infinite]" />
            <style jsx>{`
                @keyframes scanner {
                    0%, 100% { top: 10%; }
                    50% { top: 90%; }
                }
            `}</style>
        </div>
    );
}

function WalletWave() {
    return (
        <svg className="w-32 h-32 opacity-20" viewBox="0 0 100 40" fill="none">
            <path
                d="M0 20 Q10 5, 20 20 Q30 35, 40 20 Q50 5, 60 20 Q70 35, 80 20 Q90 5, 100 20"
                stroke="#0B132B"
                strokeWidth="2"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset="200"
                className="animate-[wave_4s_ease-in-out_infinite]"
            />
            <style jsx>{`
                @keyframes wave {
                    0% { stroke-dashoffset: 200; }
                    50% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -200; }
                }
            `}</style>
        </svg>
    );
}

const ANIMATIONS = { recycle: RecycleMotif, scanner: ScannerLine, wallet: WalletWave };

export function ProtocolSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>("[data-protocol-card]");

            /* ── Initialize: cards after the first start hidden ── */
            cards.forEach((card, i) => {
                if (i > 0) {
                    gsap.set(card, { y: 60, opacity: 0 });
                }
            });

            cards.forEach((card, i) => {
                if (i === 0) return;

                ScrollTrigger.create({
                    trigger: card,
                    start: "top 65%",
                    end: "top 30%",

                    /* ── Scrolling DOWN past trigger ── */
                    onEnter: () => {
                        // Blur + shrink previous card
                        if (cards[i - 1]) {
                            gsap.to(cards[i - 1], {
                                scale: 0.92,
                                filter: "blur(8px)",
                                opacity: 0.4,
                                duration: 0.6,
                                ease: "power2.inOut",
                                overwrite: true,
                            });
                        }
                        // Reveal current card
                        gsap.to(card, {
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            ease: "power3.out",
                            overwrite: true,
                        });
                    },

                    /* ── Scrolling UP past trigger (reverse) ── */
                    onLeaveBack: () => {
                        // Restore previous card
                        if (cards[i - 1]) {
                            gsap.to(cards[i - 1], {
                                scale: 1,
                                filter: "blur(0px)",
                                opacity: 1,
                                duration: 0.5,
                                ease: "power2.inOut",
                                overwrite: true,
                            });
                        }
                        // Hide current card again
                        gsap.to(card, {
                            y: 60,
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2.in",
                            overwrite: true,
                        });
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="how-it-works" ref={sectionRef} className="py-24 lg:py-32 bg-[#F0F4F8]">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-outfit)] text-[#0B132B] tracking-tight mb-6">
                        The <span className="text-[#FACC15] italic font-[family-name:var(--font-lora)]">Protocol</span>
                    </h2>
                    <p className="text-lg text-[#64748B] max-w-xl mx-auto">
                        Three steps. One wallet. Real money for real environmental impact.
                    </p>
                </div>

                {/* Stacking Cards */}
                <div ref={cardsRef} className="space-y-8 max-w-3xl mx-auto">
                    {PROTOCOL_STEPS.map((step, i) => {
                        const AnimComponent = ANIMATIONS[step.animation as keyof typeof ANIMATIONS];
                        return (
                            <div
                                key={i}
                                id={step.id}
                                data-protocol-card
                                className={`relative ${step.bg} rounded-[2rem] p-10 md:p-14 overflow-hidden`}
                                style={{ willChange: "transform, filter, opacity" }}
                            >
                                {/* SVG Animation */}
                                <div className="absolute top-6 right-6">
                                    <AnimComponent />
                                </div>

                                {/* Step Number */}
                                <span className={`text-sm font-[family-name:var(--font-ibm-plex-mono)] ${step.stepColor} tracking-widest mb-4 block`}>
                                    {step.step}
                                </span>

                                {/* Title */}
                                <h3 className={`text-3xl md:text-4xl font-bold font-[family-name:var(--font-outfit)] ${step.textColor} mb-4 tracking-tight`}>
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className={`${step.subtextColor} leading-relaxed max-w-md`}>
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
