"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Protocol Step Data ─────────────────────────────────── */
const PROTOCOL_STEPS = [
    {
        id: "protocol-scan",
        step: "01",
        title: "Scan",
        description:
            "Open EnviroPay, find your nearest machine on EnviroMap, and scan the QR code to start your return session instantly.",
        slides: [
            "/images/enviropay-home.PNG",
            "/images/enviropay-scan.PNG",
            "/images/enviropay-scan-qr.PNG",
        ],
        bg: "bg-gradient-to-br from-[#FACC15] to-[#F97316]",
        textColor: "text-[#0B132B]",
        subtextColor: "text-[#0B132B]/70",
        stepColor: "text-[#0B132B]/40",
        phoneShadow: "rgba(249, 115, 22, 0.35)",
        dotActiveColor: "#0B132B",
        dotInactiveColor: "rgba(11, 19, 43, 0.25)",
    },
    {
        id: "protocol-return",
        step: "02",
        title: "Return",
        description:
            "Find your nearest EnviroPoint on the map. Select your containers — plastic, aluminium, steel — and drop them in. Done.",
        slides: [
            "/images/enviropay-return.PNG",
            "/images/enviropay-return-containers.PNG",
            "/images/enviropay-return-complete.PNG",
        ],
        bg: "bg-gradient-to-br from-[#A8E10C] to-[#00C9A7]",
        textColor: "text-[#0B132B]",
        subtextColor: "text-[#0B132B]/70",
        stepColor: "text-[#0B132B]/40",
        phoneShadow: "rgba(0, 201, 167, 0.35)",
        dotActiveColor: "#0B132B",
        dotInactiveColor: "rgba(11, 19, 43, 0.25)",
    },
    {
        id: "protocol-earn",
        step: "03",
        title: "Earn",
        description:
            "Your deposit hits your EnviroWallet in seconds. Withdraw to your bank, PayPal, or donate to environmental causes.",
        slides: [
            "/images/enviropay-earn-wallet-balance.PNG",
            "/images/enviropay-wallet-withdraw.PNG",
            "/images/enviropay-wallet-withdraw-success.PNG",
        ],
        bg: "bg-gradient-to-br from-[#22D3EE] to-[#00C9A7]",
        textColor: "text-[#0B132B]",
        subtextColor: "text-[#0B132B]/70",
        stepColor: "text-[#0B132B]/40",
        phoneShadow: "rgba(34, 211, 238, 0.35)",
        dotActiveColor: "#0B132B",
        dotInactiveColor: "rgba(11, 19, 43, 0.25)",
    },
];

/* ── Phone Carousel Component ────────────────────────────── */
function PhoneCarousel({
    slides,
    alt,
    shadow,
    dotActiveColor,
    dotInactiveColor,
}: {
    slides: string[];
    alt: string;
    shadow: string;
    dotActiveColor: string;
    dotInactiveColor: string;
}) {
    const [activeSlide, setActiveSlide] = useState(0);
    const activeRef = useRef(0); // ref for GSAP — no stale closures
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const screenRef = useRef<HTMLDivElement>(null);

    const goToSlide = useCallback(
        (nextIndex: number) => {
            if (!screenRef.current) return;
            const imgs = screenRef.current.querySelectorAll<HTMLDivElement>("[data-slide]");
            if (!imgs.length) return;
            const currentIndex = activeRef.current;
            if (currentIndex === nextIndex) return;

            // Crossfade out current slide
            gsap.to(imgs[currentIndex], {
                opacity: 0,
                scale: 1.04,
                duration: 0.5,
                ease: "power2.inOut",
            });

            // Crossfade in next slide
            gsap.fromTo(
                imgs[nextIndex],
                { opacity: 0, scale: 0.96 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.inOut",
                    delay: 0.05,
                }
            );

            activeRef.current = nextIndex;
            setActiveSlide(nextIndex);
        },
        [] // no deps — uses ref
    );

    const startAutoRotate = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            const next = (activeRef.current + 1) % slides.length;
            goToSlide(next);
        }, 3500);
    }, [slides.length, goToSlide]);

    // Auto-rotate on mount
    useEffect(() => {
        startAutoRotate();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startAutoRotate]);

    // Click a dot to jump
    const handleDotClick = (index: number) => {
        goToSlide(index);
        startAutoRotate(); // restart timer
    };

    /* ── Touch/Swipe support ── */
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartRef.current) return;
        const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
        const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Only trigger if horizontal swipe is dominant and exceeds threshold
        if (absDx > 40 && absDx > absDy * 1.5) {
            if (dx < 0) {
                // Swipe left → next
                const next = (activeRef.current + 1) % slides.length;
                goToSlide(next);
            } else {
                // Swipe right → prev
                const prev = (activeRef.current - 1 + slides.length) % slides.length;
                goToSlide(prev);
            }
            startAutoRotate();
        }
        touchStartRef.current = null;
    };

    /* ── Mouse drag support (desktop) ── */
    const dragStartRef = useRef<{ x: number } | null>(null);

    const onMouseDown = (e: React.MouseEvent) => {
        dragStartRef.current = { x: e.clientX };
    };

    const onMouseUp = (e: React.MouseEvent) => {
        if (!dragStartRef.current) return;
        const dx = e.clientX - dragStartRef.current.x;
        const absDx = Math.abs(dx);

        if (absDx > 40) {
            if (dx < 0) {
                const next = (activeRef.current + 1) % slides.length;
                goToSlide(next);
            } else {
                const prev = (activeRef.current - 1 + slides.length) % slides.length;
                goToSlide(prev);
            }
            startAutoRotate();
        }
        dragStartRef.current = null;
    };

    return (
        <div className="relative flex flex-col items-center gap-5">
            {/* Device shell */}
            <div
                className="relative flex-shrink-0"
                style={{
                    width: "clamp(240px, 60vw, 320px)",
                    filter: `drop-shadow(0 24px 48px ${shadow})`,
                }}
            >
                <div
                    className="relative rounded-[3rem] md:rounded-[3.2rem] select-none"
                    style={{ aspectRatio: "9 / 19.5" }}
                >
                    {/* 1. Outer Metallic Ring (Silver Titanium) */}
                    <div className="absolute inset-0 rounded-[3rem] md:rounded-[3.2rem] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.8),_0_0_0_1px_rgba(0,0,0,0.1)] ring-4 ring-neutral-200 bg-neutral-100" />
                    {/* 2. Inner Bezel (Black Glass Edge) */}
                    <div className="absolute inset-[3px] bg-black rounded-[2.8rem] md:rounded-[3rem] border-[6px] border-black" />

                    {/* 3. Screen — layered slides with swipe support */}
                    <div
                        ref={screenRef}
                        className="absolute inset-[9px] rounded-[2.5rem] md:rounded-[2.8rem] overflow-hidden bg-[#F0F4F8] cursor-grab active:cursor-grabbing"
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onDragStart={(e) => e.preventDefault()}
                    >
                        {slides.map((src, i) => (
                            <div
                                key={src}
                                data-slide
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    opacity: i === 0 ? 1 : 0,
                                    zIndex: i === activeSlide ? 2 : 1,
                                    willChange: "opacity, transform",
                                }}
                            >
                                <Image
                                    src={src}
                                    alt={`${alt} — Screen ${i + 1}`}
                                    fill
                                    draggable={false}
                                    className="object-cover object-top pointer-events-none"
                                    sizes="(max-width: 768px) 200px, 320px"
                                    quality={75}
                                    priority={i === 0}
                                />
                            </div>
                        ))}
                        {/* Glass reflection overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay z-10" />
                    </div>
                </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleDotClick(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className="relative transition-all duration-300 ease-out"
                        style={{
                            width: activeSlide === i ? 24 : 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor:
                                activeSlide === i ? dotActiveColor : dotInactiveColor,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

/* ── Main Section ────────────────────────────────────────── */
export function ProtocolSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>("[data-protocol-card]");
            const phones = gsap.utils.toArray<HTMLElement>("[data-phone-mockup]");

            /* ── Initialize: cards after the first start hidden ── */
            cards.forEach((card, i) => {
                if (i > 0) {
                    gsap.set(card, { y: 60, opacity: 0 });
                }
            });

            /* ── Card stacking animations ── */
            cards.forEach((card, i) => {
                if (i === 0) return;

                ScrollTrigger.create({
                    trigger: card,
                    start: "top 45%",
                    end: "top 20%",

                    onEnter: () => {
                        // Blur + shrink previous card (set ALL props to avoid stale state)
                        if (cards[i - 1]) {
                            gsap.killTweensOf(cards[i - 1]);
                            gsap.to(cards[i - 1], {
                                y: 0,
                                scale: 0.92,
                                filter: "blur(8px)",
                                opacity: 0.4,
                                duration: 0.6,
                                ease: "power2.inOut",
                            });
                        }
                        // Reveal current card (set ALL props)
                        gsap.killTweensOf(card);
                        gsap.to(card, {
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)",
                            opacity: 1,
                            duration: 0.7,
                            ease: "power3.out",
                        });
                    },

                    onLeaveBack: () => {
                        // Restore previous card (set ALL props)
                        if (cards[i - 1]) {
                            gsap.killTweensOf(cards[i - 1]);
                            gsap.to(cards[i - 1], {
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                                opacity: 1,
                                duration: 0.5,
                                ease: "power2.inOut",
                            });
                        }
                        // Hide current card (set ALL props)
                        gsap.killTweensOf(card);
                        gsap.to(card, {
                            y: 60,
                            scale: 1,
                            filter: "blur(0px)",
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2.in",
                        });
                    },
                });
            });

            /* ── Phone Parallax: Immersive Vertical Rise ── */
            phones.forEach((phone) => {
                const parentCard = phone.closest("[data-protocol-card]");
                if (!parentCard) return;

                // Initial state — small, shifted down, faded
                gsap.set(phone, {
                    scale: 0.55,
                    y: 80,
                    opacity: 0,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: parentCard,
                        start: "top 85%",
                        end: "bottom 15%",
                        scrub: 0.6,
                    },
                });

                // Phase 1: Rise — emerge from below, scale to natural
                tl.to(phone, {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                });

                // Phase 2: Surge — scale past natural, lift upward
                tl.to(phone, {
                    scale: 1.18,
                    y: -30,
                    opacity: 0.7,
                    duration: 1,
                    ease: "power1.in",
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
                        <span className="text-[#FACC15]">Enviro</span>Pay{" "}
                        Mobile App
                    </h2>
                    <p className="text-lg text-[#64748B] max-w-xl mx-auto">
                        Three steps. One wallet. Real money for real environmental impact.
                    </p>
                </div>

                {/* Stacking Cards */}
                <div ref={cardsRef} className="space-y-8 max-w-4xl mx-auto">
                    {PROTOCOL_STEPS.map((step, i) => (
                        <div
                            key={i}
                            id={step.id}
                            data-protocol-card
                            className={`relative ${step.bg} rounded-[1.25rem] md:rounded-[2rem] p-6 md:p-12 lg:p-14 overflow-hidden`}
                            style={{ willChange: "transform, filter, opacity" }}
                        >
                            {/* Card inner layout — text left, phone right */}
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                {/* Text content */}
                                <div className="flex-1 min-w-0">
                                    {/* Step Number */}
                                    <span
                                        className={`text-sm font-[family-name:var(--font-ibm-plex-mono)] ${step.stepColor} tracking-widest mb-4 block`}
                                    >
                                        {step.step}
                                    </span>

                                    {/* Title */}
                                    <h3
                                        className={`text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] ${step.textColor} mb-4 tracking-tight`}
                                    >
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className={`${step.subtextColor} leading-relaxed max-w-md text-base md:text-lg`}
                                    >
                                        {step.description}
                                    </p>
                                </div>

                                {/* Phone Mockup — GSAP parallax target */}
                                <div
                                    data-phone-mockup
                                    style={{ willChange: "transform, opacity" }}
                                >
                                    <PhoneCarousel
                                        slides={step.slides}
                                        alt={`EnviroPay ${step.title}`}
                                        shadow={step.phoneShadow}
                                        dotActiveColor={step.dotActiveColor}
                                        dotInactiveColor={step.dotInactiveColor}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
