"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scan, Wallet, CalendarDays, Radio } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   Card 1 — Diagnostic Shuffler
   The core journey: Scan, Return, Earn
   ═══════════════════════════════════════════ */

const SHUFFLE_ITEMS = [
    { label: "Scan barcode", detail: "Point your camera at any DRS container", color: "#0EA5E9" },
    { label: "Return nearby", detail: "Drop it at your nearest EnviroPoint", color: "#0B132B" },
    { label: "Earn instantly", detail: "20p credited to your EnviroWallet", color: "#D4A855" },
];

function DiagnosticShuffler() {
    const [order, setOrder] = useState([0, 1, 2]);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrder(prev => {
                const newOrder = [...prev];
                const last = newOrder.pop()!;
                newOrder.unshift(last);
                return newOrder;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[200px]">
            {order.map((itemIndex, stackPos) => (
                <div
                    key={itemIndex}
                    className="absolute inset-x-0 transition-all duration-500"
                    style={{
                        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                        top: `${stackPos * 16}px`,
                        zIndex: 3 - stackPos,
                        opacity: 1 - stackPos * 0.2,
                        transform: `scale(${1 - stackPos * 0.04})`,
                    }}
                >
                    <div
                        className="p-5 rounded-2xl border border-[#CBD5E1]/50 bg-white shadow-sm"
                        style={{ borderLeftColor: SHUFFLE_ITEMS[itemIndex].color, borderLeftWidth: "3px" }}
                    >
                        <p className="font-bold text-[#0B132B] font-[family-name:var(--font-outfit)]">
                            {SHUFFLE_ITEMS[itemIndex].label}
                        </p>
                        <p className="text-sm text-[#64748B] mt-1">
                            {SHUFFLE_ITEMS[itemIndex].detail}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════
   Card 2 — Telemetry Typewriter
   Live wallet activity feed
   ═══════════════════════════════════════════ */

const FEED_MESSAGES = [
    "↑ Return confirmed · Manchester · +£0.20",
    "↑ Payout processed · Birmingham · £4.80",
    "↑ New EnviroPoint · Bristol · Tesco Express",
    "↑ Return confirmed · London · +£0.20",
    "↑ Wallet top-up · Leeds · +£3.40",
    "↑ Donation sent · Edinburgh · £2.00 to Plastic Oceans",
];

function TelemetryTypewriter() {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState("");
    const [messageIndex, setMessageIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const message = FEED_MESSAGES[messageIndex];
        if (charIndex < message.length) {
            const timeout = setTimeout(() => {
                setCurrentLine(prev => prev + message[charIndex]);
                setCharIndex(prev => prev + 1);
            }, 30);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayedLines(prev => [currentLine, ...prev].slice(0, 4));
                setCurrentLine("");
                setCharIndex(0);
                setMessageIndex(prev => (prev + 1) % FEED_MESSAGES.length);
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, messageIndex, currentLine]);

    return (
        <div className="font-[family-name:var(--font-ibm-plex-mono)] text-xs space-y-2 min-h-[160px]">
            {/* Current typing line */}
            <div className="flex items-center gap-1">
                <span className="text-[#0B132B]">{currentLine}</span>
                <span className="w-[2px] h-4 bg-[#0EA5E9] animate-blink inline-block" />
            </div>
            {/* Previous lines */}
            {displayedLines.map((line, i) => (
                <div key={`${line}-${i}`} className="text-[#64748B]/60">
                    {line}
                </div>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════
   Card 3 — Cursor Protocol Scheduler
   Building a return habit
   ═══════════════════════════════════════════ */

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function CursorScheduler() {
    const [activeDays, setActiveDays] = useState<number[]>([]);
    const [cursorPos, setCursorPos] = useState({ x: -20, y: -20 });
    const [cursorVisible, setCursorVisible] = useState(false);
    const [pressing, setPressing] = useState<number | null>(null);
    const [saved, setSaved] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const animating = useRef(false);

    const runAnimation = useCallback(() => {
        if (animating.current || !gridRef.current) return;
        animating.current = true;
        setActiveDays([]);
        setSaved(false);

        const targetDays = [1, 3, 5]; // Mon, Wed, Fri
        let step = 0;

        setCursorVisible(true);
        setCursorPos({ x: -20, y: 30 });

        const moveToDay = () => {
            if (step >= targetDays.length) {
                // Move to Save button
                setTimeout(() => {
                    setCursorPos({ x: 140, y: 90 });
                    setTimeout(() => {
                        setSaved(true);
                        setTimeout(() => {
                            setCursorVisible(false);
                            animating.current = false;
                        }, 1500);
                    }, 400);
                }, 300);
                return;
            }

            const dayIndex = targetDays[step];
            const x = dayIndex * 38 + 16;
            const y = 30;

            setCursorPos({ x, y });

            setTimeout(() => {
                setPressing(dayIndex);
                setTimeout(() => {
                    setActiveDays(prev => [...prev, dayIndex]);
                    setPressing(null);
                    step++;
                    setTimeout(moveToDay, 400);
                }, 200);
            }, 500);
        };

        setTimeout(moveToDay, 600);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(runAnimation, 1000);
        const interval = setInterval(runAnimation, 12000);
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [runAnimation]);

    return (
        <div className="relative" ref={gridRef}>
            {/* Day Grid */}
            <div className="flex gap-2 mb-6">
                {DAYS.map((day, i) => (
                    <div
                        key={i}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${activeDays.includes(i)
                            ? "bg-[#0EA5E9] text-white shadow-sm"
                            : "bg-[#E2E8F0] text-[#64748B]"
                            } ${pressing === i ? "scale-[0.9]" : ""}`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${saved
                    ? "bg-[#0EA5E9] text-white"
                    : "bg-[#E2E8F0] text-[#64748B]"
                    }`}
            >
                {saved ? "✓ Saved!" : "Save schedule"}
            </div>

            {/* Animated Cursor */}
            {cursorVisible && (
                <svg
                    className="absolute pointer-events-none transition-all duration-500 ease-out"
                    style={{ left: cursorPos.x, top: cursorPos.y }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M5 3l14 9-7 2-3 7L5 3z"
                        fill="#0B132B"
                        stroke="white"
                        strokeWidth="1.5"
                    />
                </svg>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   Features Section — Parent
   ═══════════════════════════════════════════ */

export function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("[data-feature-card]", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const cards = [
        {
            icon: Scan,
            title: "The Journey",
            description: "Scan, return, earn — three steps to turn any container into real money.",
            widget: <DiagnosticShuffler />,
        },
        {
            icon: Wallet,
            title: "Live Wallet",
            description: "Every refund lands instantly. Track your balance, your impact, your payouts.",
            widget: <TelemetryTypewriter />,
            badge: { label: "Live Feed", pulsing: true },
        },
        {
            icon: CalendarDays,
            title: "Return Habits",
            description: "Build a routine. Set return days and watch your savings grow.",
            widget: <CursorScheduler />,
        },
    ];

    return (
        <section id="features" ref={sectionRef} className="py-24 lg:py-32 bg-[#F0F4F8]">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-outfit)] text-[#0B132B] tracking-tight mb-6">
                        How EnviroPay <span className="text-[#0EA5E9] italic font-[family-name:var(--font-lora)]">works</span>
                    </h2>
                    <p className="text-lg text-[#64748B] max-w-xl mx-auto">
                        Not just another wallet. A functional micro-system for turning containers into currency.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={i}
                                data-feature-card
                                className="bg-white rounded-[2rem] border border-[#CBD5E1]/40 p-8 shadow-premium hover:shadow-float transition-shadow duration-500 flex flex-col"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-[#0EA5E9]/10">
                                            <Icon size={20} className="text-[#0EA5E9]" />
                                        </div>
                                        <h3 className="text-lg font-bold font-[family-name:var(--font-outfit)] text-[#0B132B]">
                                            {card.title}
                                        </h3>
                                    </div>
                                    {card.badge && (
                                        <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#64748B]">
                                            <Radio size={10} className="text-[#0EA5E9] animate-pulse" />
                                            {card.badge.label}
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
                                    {card.description}
                                </p>

                                {/* Interactive Widget */}
                                <div className="mt-auto">
                                    {card.widget}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
