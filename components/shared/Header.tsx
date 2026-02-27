"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { label: "How It Works", href: "features" },
    { label: "For Consumers", href: "consumers" },
    { label: "For Retailers", href: "retailers" },
    { label: "Our Mission", href: "why" },
];

/* Section-to-CTA-color mapping */
const SECTION_THEMES: Record<string, { gradient: string; text: string; payColor: string }> = {
    hero: { gradient: "bg-gradient-to-r from-[#67E8F9] to-[#2563EB]", text: "text-white", payColor: "#38BDF8" },
    features: { gradient: "bg-gradient-to-r from-[#67E8F9] to-[#2563EB]", text: "text-white", payColor: "#38BDF8" },
    "protocol-scan": { gradient: "bg-gradient-to-r from-[#FACC15] to-[#F97316]", text: "text-white", payColor: "#FACC15" },
    "protocol-return": { gradient: "bg-gradient-to-r from-[#A8E10C] to-[#00C9A7]", text: "text-[#0B132B]", payColor: "#A8E10C" },
    "protocol-earn": { gradient: "bg-gradient-to-r from-[#22D3EE] to-[#00C9A7]", text: "text-[#0B132B]", payColor: "#22D3EE" },
    consumers: { gradient: "bg-gradient-to-r from-[#FACC15] to-[#F97316]", text: "text-white", payColor: "#FACC15" },
    retailers: { gradient: "bg-gradient-to-r from-[#D4A855] to-[#C49A48]", text: "text-white", payColor: "#D4A855" },
    partners: { gradient: "bg-gradient-to-r from-[#A8E10C] to-[#00C9A7]", text: "text-[#0B132B]", payColor: "#A8E10C" },
    "get-involved": { gradient: "bg-gradient-to-r from-[#A8E10C] to-[#00C9A7]", text: "text-[#0B132B]", payColor: "#A8E10C" },
    contact: { gradient: "bg-gradient-to-r from-[#67E8F9] to-[#2563EB]", text: "text-white", payColor: "#38BDF8" },
};
const DEFAULT_THEME = { gradient: "bg-gradient-to-r from-[#A8E10C] via-[#A8E10C] via-60% to-[#00C9A7]", text: "text-[#0B132B]", payColor: "#00C9A7" };

/* ─── Animated gradient keyframes (injected once) ─── */
const GRADIENT_KEYFRAMES = `
@keyframes header-enviro-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
`;

export function Header() {
    const [scrolled, setScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [activeTheme, setActiveTheme] = React.useState(DEFAULT_THEME);
    const [isAtFooter, setIsAtFooter] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        handleScroll(); // check on mount
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* IntersectionObserver to detect which section is in view */
    React.useEffect(() => {
        const sectionIds = Object.keys(SECTION_THEMES);
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            /* Protocol cards are smaller elements — use rootMargin to only
               trigger when they're centered in the viewport (inner 30%) */
            const isProtocolCard = id.startsWith("protocol-");
            const options: IntersectionObserverInit = isProtocolCard
                ? { threshold: 0.2, rootMargin: "-35% 0px -35% 0px" }
                : { threshold: 0.3 };

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveTheme(SECTION_THEMES[id]);
                        setIsAtFooter(false);
                    }
                },
                options
            );
            observer.observe(el);
            observers.push(observer);
        });

        /* Also observe "default" sections to reset the theme */
        const defaultSections = ["philosophy", "why", "contact"];
        defaultSections.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveTheme(DEFAULT_THEME);
                        setIsAtFooter(false);
                    }
                },
                { threshold: 0.3 }
            );
            observer.observe(el);
            observers.push(observer);
        });

        /* ── Observe the footer for the animated gradient mode ── */
        const footerEl = document.querySelector("footer");
        if (footerEl) {
            const footerObserver = new IntersectionObserver(
                ([entry]) => {
                    setIsAtFooter(entry.isIntersecting);
                },
                { threshold: 0.15 }
            );
            footerObserver.observe(footerEl);
            observers.push(footerObserver);
        }

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    /* ── Animated gradient inline styles ── */
    const animatedGradientStyle: React.CSSProperties = {
        background: "linear-gradient(90deg, #38BDF8, #FACC15, #A8E10C, #22D3EE, #D4A855, #A8E10C, #38BDF8, #FACC15, #A8E10C)",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "header-enviro-flow 8s ease-in-out infinite",
    };

    const animatedCTAStyle: React.CSSProperties = {
        background: "linear-gradient(90deg, #38BDF8, #FACC15, #A8E10C, #22D3EE, #D4A855, #A8E10C, #38BDF8, #FACC15, #A8E10C)",
        backgroundSize: "300% 100%",
        animation: "header-enviro-flow 8s ease-in-out infinite",
    };

    return (
        <>
            {/* Inject keyframes once */}
            <style dangerouslySetInnerHTML={{ __html: GRADIENT_KEYFRAMES }} />

            {/* ─── Desktop: The Floating Island ─── */}
            <header
                className={cn(
                    "hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center py-2.5 pl-6 pr-3 gap-6 rounded-full transition-all duration-500 will-change-transform",
                    scrolled
                        ? "bg-[#F0F4F8]/95 backdrop-blur-xl shadow-premium border border-[#CBD5E1]/60"
                        : "bg-transparent"
                )}
            >
                {/* Logo */}
                <Link
                    href="#hero"
                    onClick={(e) => scrollToSection(e, "hero")}
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                    <span className={cn(
                        "text-lg font-bold font-[family-name:var(--font-outfit)] tracking-tight transition-colors duration-500",
                        scrolled ? "text-[#0B132B]" : "text-white"
                    )}>
                        {isAtFooter ? (
                            <span style={animatedGradientStyle}>Enviro</span>
                        ) : (
                            <span className="transition-colors duration-500" style={{ color: activeTheme.payColor }}>Enviro</span>
                        )}
                        Pay
                    </span>
                </Link>

                {/* Nav Items */}
                <nav className="flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={`#${item.href}`}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap link-lift transition-colors duration-500",
                                scrolled
                                    ? "text-[#0B132B]/70 hover:text-[#0B132B] hover:bg-[#0B132B]/5"
                                    : "text-white/80 hover:text-white hover:bg-white/10"
                            )}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* CTA — section-aware gradient / animated at footer */}
                <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "contact")}
                    className={cn(
                        "btn-magnetic flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-glow-mint whitespace-nowrap transition-all duration-500",
                        !isAtFooter && activeTheme.gradient,
                        isAtFooter ? "text-[#0B132B]" : activeTheme.text
                    )}
                    style={isAtFooter ? animatedCTAStyle : undefined}
                >
                    Join Waitlist
                </a>
            </header>

            {/* ─── Mobile Header ─── */}
            <header className={cn(
                "md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled || isMobileMenuOpen
                    ? "bg-[#F0F4F8]/95 backdrop-blur-xl border-b border-[#CBD5E1]/50"
                    : "bg-transparent"
            )}>
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        href="#hero"
                        onClick={(e) => scrollToSection(e, "hero")}
                        className="flex items-center"
                    >
                        <span className={cn(
                            "text-lg font-bold font-[family-name:var(--font-outfit)] tracking-tight transition-colors duration-500",
                            scrolled || isMobileMenuOpen ? "text-[#0B132B]" : "text-white"
                        )}>
                            {isAtFooter ? (
                                <span style={animatedGradientStyle}>Enviro</span>
                            ) : (
                                <span className="transition-colors duration-500" style={{ color: activeTheme.payColor }}>Enviro</span>
                            )}
                            Pay
                        </span>
                    </Link>

                    <button
                        className={cn(
                            "p-2 rounded-full transition-colors",
                            scrolled || isMobileMenuOpen
                                ? "text-[#0B132B] hover:bg-[#0B132B]/10"
                                : "text-white hover:bg-white/10"
                        )}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X strokeWidth={2.5} /> : <Menu strokeWidth={2.5} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-16 left-0 right-0 p-6 bg-[#F0F4F8]/95 backdrop-blur-xl border-b border-[#CBD5E1]/30 flex flex-col gap-2">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={`#${item.href}`}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="p-4 rounded-2xl text-lg font-medium text-[#0B132B]/70 hover:text-[#0B132B] hover:bg-[#0B132B]/5 transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="mt-4">
                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, "contact")}
                                className={cn(
                                    "btn-magnetic flex items-center justify-center w-full px-4 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-500",
                                    !isAtFooter && activeTheme.gradient,
                                    isAtFooter ? "text-[#0B132B]" : activeTheme.text
                                )}
                                style={isAtFooter ? animatedCTAStyle : undefined}
                            >
                                Join Waitlist
                            </a>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
