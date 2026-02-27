"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScanLine, MapPin, CreditCard, ArrowRightLeft } from "lucide-react";

const TABS = [
    {
        id: "return",
        label: "Return",
        icon: MapPin,
        src: "/images/screens/EnviroPay---Return---Light.jpeg",
        caption: "Locate a return machine near you and start your journey."
    },
    {
        id: "scan",
        label: "Scan",
        icon: ScanLine,
        src: "/images/screens/EnviroPay---Scan---Light.jpeg",
        caption: "Scan your bottles to initiate the return process."
    },
    {
        id: "earn",
        label: "Earn",
        icon: CreditCard,
        src: "/images/screens/EnviroPay---Spend---Light.jpeg",
        caption: "Receive your deposit refund instantly in your wallet."
    },
    {
        id: "withdraw",
        label: "Withdraw",
        icon: ArrowRightLeft,
        src: "/images/screens/EnviroPay---Withdraw---Light.jpeg",
        caption: "Cash out to your bank account or donate to charity."
    },
];

export function AppPreview() {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveTab((current) => {
                const currentIndex = TABS.findIndex(t => t.id === current.id);
                const nextIndex = (currentIndex + 1) % TABS.length;
                return TABS[nextIndex];
            });
        }, 3000); // 3 seconds per slide

        return () => clearInterval(interval);
    }, [isPaused, activeTab]); // Re-run when tab changes to reset timer


    return (
        <section className="py-24 lg:py-32 relative overflow-hidden bg-[#F4F7F5]">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-multiply grayscale contrast-125"
                style={{
                    backgroundImage: `url("/images/patterns/pattern-05.jpeg")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '400px',
                    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,1) 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,1) 100%)'
                }}
            />

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#86E70F]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00B01A]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

            <div
                className="container mx-auto px-4 relative z-10 w-full max-w-6xl"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Controls */}
                    <div className="space-y-10 order-2 lg:order-1">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-[#163841] leading-[1.1]">
                                The app, <br />
                                <span className="text-[#00B01A]">in four actions.</span>
                            </h2>
                            <p className="text-[#163841]/70 text-xl font-medium leading-relaxed max-w-md">
                                Scan to start. Return nearby. Spend your balance. Withdraw when available.
                            </p>
                        </div>

                        <div className="space-y-2">
                            {TABS.map((tab) => {
                                const isActive = activeTab.id === tab.id;
                                const Icon = tab.icon;
                                const isFillable = tab.id === 'return' || tab.id === 'spend';

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 group",
                                            isActive
                                                ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] scale-[1.02] ring-1 ring-[#00B01A]/10"
                                                : "hover:bg-[#163841]/5 active:scale-[0.98]"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3 rounded-xl transition-all duration-300 shadow-sm",
                                            isActive
                                                ? "bg-[#00B01A] text-white shadow-[#00B01A]/20 scale-110"
                                                : "bg-[#163841]/5 text-[#163841]/60 group-hover:bg-[#163841]/10 group-hover:text-[#163841]"
                                        )}>
                                            <Icon
                                                size={22}
                                                fill={isFillable ? "currentColor" : "none"}
                                                strokeWidth={isFillable ? 0 : 2.5}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className={cn(
                                                    "block text-lg font-bold transition-colors mb-1",
                                                    isActive ? "text-[#163841]" : "text-[#163841]/60 group-hover:text-[#163841]/80"
                                                )}>
                                                    {tab.label}
                                                </span>

                                                {/* Animated Progress Bar (Visible only when active & not paused) */}
                                                {isActive && !isPaused && (
                                                    <div className="h-1 w-10 bg-black/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#00B01A] animate-progress origin-left" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className={cn(
                                                "grid transition-all duration-300 ease-in-out",
                                                isActive ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0"
                                            )}>
                                                <span className="overflow-hidden text-sm font-medium text-[#163841]/60">
                                                    {tab.caption}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Phone Frame (Titanium Style - Silver) */}
                    <div className="order-1 lg:order-2 flex justify-center relative">
                        {/* Decorative Circle behind phone */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#00B01A]/10 to-transparent rounded-full blur-3xl scale-90" />

                        <div className="relative w-[320px] h-[640px] sm:w-[340px] sm:h-[680px] rounded-[3.5rem] shadow-2xl z-20 transition-transform duration-500 hover:scale-[1.01] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] select-none border-none ring-0">
                            {/* 1. Outer Metallic Ring (Silver Titanium) */}
                            <div className="absolute inset-0 rounded-[3.5rem] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.8),_0_0_0_1px_rgba(0,0,0,0.1)] ring-4 ring-neutral-200 bg-neutral-100" />
                            {/* 2. Inner Bezel (Black Glass Edge) */}
                            <div className="absolute inset-[3px] bg-black rounded-[3.3rem] border-[6px] border-black" />

                            <div className="absolute inset-[9px] rounded-[3rem] overflow-hidden bg-white">
                                <img
                                    key={activeTab.src}
                                    src={activeTab.src}
                                    alt={activeTab.caption}
                                    className="absolute inset-0 w-full h-full object-cover object-top animate-fadeIn select-none mix-blend-normal"
                                />
                                {/* Reflection */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <style jsx global>{`
                @keyframes progress {
                    0% { transform: scaleX(0); }
                    100% { transform: scaleX(1); }
                }
                .animate-progress {
                    animation: progress 3s linear;
                }
            `}</style>
        </section>
    );
}
