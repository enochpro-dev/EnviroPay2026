"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Waves, TreePine, Fish, Wind, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Environmental Hotspots ─── */
const HOTSPOTS = [
    {
        id: "oceans",
        icon: Waves,
        label: "Cleaner Oceans",
        stat: "8M tonnes",
        description: "of plastic enter oceans yearly. Every bottle returned through DRS is one less in our waterways.",
        position: { top: "18%", left: "22%" },
        positionMobile: { top: "18%", left: "12%" },
        color: "#0EA5E9",
    },
    {
        id: "forests",
        icon: TreePine,
        label: "Reduced Landfill",
        stat: "91%",
        description: "of plastic is never recycled. DRS systems have achieved deposit return rates above 90% in every country that adopts them.",
        position: { top: "15%", left: "75%" },
        positionMobile: { top: "32%", left: "78%" },
        color: "#10B981",
    },
    {
        id: "wildlife",
        icon: Fish,
        label: "Wildlife Protection",
        stat: "100K+",
        description: "marine animals die from plastic ingestion each year. Fewer bottles in nature means fewer casualties.",
        position: { top: "50%", left: "55%" },
        positionMobile: { top: "55%", left: "20%" },
        color: "#F97316",
    },
    {
        id: "carbon",
        icon: Wind,
        label: "Lower CO\u2082",
        stat: "70%",
        description: "less energy is needed to produce goods from recycled materials vs virgin plastic. DRS closes the loop.",
        position: { top: "28%", left: "60%" },
        positionMobile: { top: "48%", left: "82%" },
        color: "#38BDF8",
    },
];

export function PhilosophySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text entrance
            gsap.from("[data-philosophy-line]", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });

            // Hotspot pulse entrance
            gsap.from("[data-hotspot]", {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="philosophy"
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden"
        >
            {/* ─── Full-bleed Nature Background ─── */}
            <div className="absolute inset-0">
                <img
                    src="/images/upscaled/ocean-hero.jpeg"
                    alt="Stunning aerial view of turquoise ocean meeting white sandy beach"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for text readability — heavier at bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#062B2B]/60 via-[#062B2B]/40 to-[#062B2B]/80" />
            </div>

            {/* ─── Interactive Hotspots ─── */}
            {HOTSPOTS.map((spot) => {
                const Icon = spot.icon;
                const isActive = activeHotspot === spot.id;

                return (
                    <div
                        key={spot.id}
                        data-hotspot
                        className={`absolute hidden md:block ${isActive ? "z-30" : "z-20"}`}
                        style={{ top: spot.position.top, left: spot.position.left }}
                    >
                        {/* Pulsing ring */}
                        <button
                            onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                            className="relative group cursor-pointer"
                        >
                            {/* Outer pulse ring */}
                            <span className="absolute inset-0 -m-3 rounded-full border-2 animate-ping" style={{ borderColor: `${spot.color}66` }} />
                            <span className="absolute inset-0 -m-2 rounded-full border animate-pulse" style={{ borderColor: `${spot.color}33` }} />

                            {/* Icon circle */}
                            <div
                                className={`
                                    w-12 h-12 rounded-full flex items-center justify-center
                                    transition-all duration-300
                                    ${isActive
                                        ? "text-white scale-110"
                                        : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:scale-105"
                                    }
                                `}
                                style={isActive ? { backgroundColor: spot.color, boxShadow: `0 0 30px ${spot.color}80` } : {}}
                            >
                                <Icon size={20} />
                            </div>
                        </button>

                        {/* Tooltip card */}
                        <div className={`
                            absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 z-30
                            rounded-2xl p-5 backdrop-blur-xl
                            border transition-all duration-300 origin-top
                            ${isActive
                                ? "opacity-100 scale-100 translate-y-0 bg-[#062B2B]/90"
                                : "opacity-0 scale-90 translate-y-2 pointer-events-none bg-transparent border-transparent"
                            }
                        `}
                            style={isActive ? { borderColor: `${spot.color}4D`, boxShadow: `0 8px 32px ${spot.color}26` } : {}}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span
                                    className="font-bold font-[family-name:var(--font-outfit)] text-sm uppercase tracking-wider"
                                    style={{ color: spot.color }}
                                >
                                    {spot.label}
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                            <p className="text-3xl font-bold text-white font-[family-name:var(--font-outfit)] mb-2">
                                {spot.stat}
                            </p>
                            <p className="text-sm text-white/60 leading-relaxed">
                                {spot.description}
                            </p>
                        </div>
                    </div>
                );
            })}

            {/* ─── Mobile Hotspot Grid (replaces positioned dots on small screens) ─── */}
            <div className="md:hidden relative z-20 px-6 pt-8">
                <div className="grid grid-cols-2 gap-3">
                    {HOTSPOTS.map((spot) => {
                        const Icon = spot.icon;
                        const isActive = activeHotspot === spot.id;
                        return (
                            <button
                                key={spot.id}
                                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                                className={`
                                    rounded-xl p-4 text-left transition-all duration-300 backdrop-blur-md
                                    ${isActive
                                        ? "border"
                                        : "bg-white/5 border border-white/10"
                                    }
                                `}
                                style={isActive ? { backgroundColor: `${spot.color}33`, borderColor: `${spot.color}66` } : {}}
                            >
                                <Icon size={18} className="mb-2" style={{ color: isActive ? spot.color : "rgba(255,255,255,0.5)" }} />
                                <p className="text-xs font-bold text-white font-[family-name:var(--font-outfit)]">{spot.label}</p>
                                <p className="text-lg font-bold font-[family-name:var(--font-outfit)]" style={{ color: spot.color }}>{spot.stat}</p>
                                {isActive && (
                                    <p className="text-xs text-white/60 mt-2 leading-relaxed">{spot.description}</p>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ─── Manifesto Text ─── */}
            <div className="relative z-10 container mx-auto px-6 max-w-5xl py-32 pt-56 lg:py-44 lg:pt-72 flex flex-col justify-end min-h-[70vh]">
                {/* Line 1: The setup */}
                <p
                    data-philosophy-line
                    className="text-xl md:text-2xl text-white/50 font-[family-name:var(--font-inter)] mb-1 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                >
                    Most recycling systems focus on:
                </p>

                {/* Line 2: The conventional */}
                <p
                    data-philosophy-line
                    className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] text-white/40 tracking-tight mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                >
                    obligation.
                </p>

                {/* Line 3: The pivot */}
                <p
                    data-philosophy-line
                    className="text-xl md:text-2xl text-white/50 font-[family-name:var(--font-inter)] mb-1 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                >
                    We focus on making it
                </p>

                {/* Line 4: The creative statement */}
                <div data-philosophy-line>
                    <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-[family-name:var(--font-outfit)] tracking-tight leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                        <span className="text-white">rewarding</span>
                        <span className="text-white/30"> for </span>
                        <span className="text-[#A8E10C] italic font-[family-name:var(--font-lora)]">you</span>
                    </p>
                    <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-[family-name:var(--font-outfit)] tracking-tight leading-[1.1] mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                        <span className="text-white/30">&amp; </span>
                        <span className="text-[#A8E10C] italic font-[family-name:var(--font-lora)]">the planet</span>
                        <span className="text-[#00C9A7]">.</span>
                    </p>
                </div>

                {/* Interactive hint */}
                <p
                    data-philosophy-line
                    className="hidden md:block text-sm text-white/30 mt-12 font-[family-name:var(--font-inter)] tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                >
                    ◉ Tap the hotspots to explore the environmental impact of every bottle returned
                </p>
            </div>
        </section>
    );
}
