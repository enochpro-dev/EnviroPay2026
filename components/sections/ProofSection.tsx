"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/shared/Accordion";
import { MessageSquare, Heart } from "lucide-react";

export function ProofSection() {
    const [isOriginStoryOpen, setIsOriginStoryOpen] = useState(false);

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden bg-[#F4F7F5]">
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Ambient Glows */}
            <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-[#00B01A]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10 text-[#163841]">
                <div className="grid md:grid-cols-2 gap-8 items-stretch">

                    {/* Card A: Origin - IMMERSIVE ECO */}
                    <Card className="relative overflow-hidden flex flex-col justify-end h-full min-h-[500px] rounded-[2rem] border-0 shadow-2xl transition-all duration-500 group isolate">
                        {/* Background Image */}
                        <img
                            src="/images/pfp- 2-ladies-return-bottle.jpeg"
                            alt="Two women returning bottles"
                            className={cn(
                                "absolute inset-0 w-full h-full object-cover transition-all duration-700 -z-20",
                                isOriginStoryOpen ? "blur-md scale-110" : "group-hover:scale-105"
                            )}
                        />
                        {/* Dark Eco Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2538] via-[#0D2538]/40 to-transparent -z-10 opacity-90" />

                        <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full">
                            {/* Floating Icon Badge */}
                            <div className="mb-auto">
                                <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-lg group-hover:bg-[#86E70F] group-hover:text-[#0D2538] group-hover:border-[#86E70F] transition-all duration-500">
                                    <Heart size={26} fill="currentColor" strokeWidth={0} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="mt-8">
                                <h3 className="text-3xl font-bold font-display text-white mb-4">Inspired by Germany's "Pfand"</h3>
                                <p className="mb-6 text-white/80 text-lg leading-relaxed">
                                    Returning bottles for a small refund can be second nature. We're bringing that everyday ease to the UK — digitally.
                                </p>

                                {/* Immersive Accordion */}
                                <Accordion
                                    title="Read the story"
                                    className="border-white/20 text-white hover:text-[#86E70F] hover:border-[#86E70F]/30"
                                    onToggle={setIsOriginStoryOpen}
                                >
                                    <p className="mb-4 text-white/70">Growing up in Germany, returning empty bottles and cans for a small refund was just part of life. As a teenager, I'd collect empties for beer money — and you'd often see others collecting too, because the system made recycling normal, rewarding, and human.</p>
                                    <p className="text-white/70">With the UK's Deposit Return Scheme on the way, we're building a digital version of that experience — designed to be simple, accessible, and rewarding.</p>
                                </Accordion>

                            </div>
                        </div>
                    </Card>

                    {/* Card B: Reddit Proof */}
                    <Card className="p-8 lg:p-10 flex flex-col h-full rounded-[2rem] border-0 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white">
                        <div className="h-14 w-14 rounded-xl bg-[#00B01A]/10 text-[#00B01A] flex items-center justify-center mb-8">
                            <MessageSquare size={28} fill="currentColor" strokeWidth={0} />
                        </div>
                        <h3 className="text-3xl font-bold font-display mb-6 text-[#163841]">The UK conversation is already happening</h3>
                        <p className="mb-8 text-[#163841]/70 text-lg leading-relaxed">
                            We tested the idea in public — and the response was bigger than expected.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                            <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[#163841]/5 text-[#163841]/70">53K+ reads</span>
                            <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[#163841]/5 text-[#163841]/70">128+ comments</span>
                            <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[#163841]/5 text-[#163841]/70">Practical suggestions</span>
                        </div>
                        <div className="mt-auto">
                            <Accordion title="See what people said" className="border-[#163841]/10 text-[#163841] hover:text-[#00B01A]">
                                <p className="mb-4">We asked: <em>If UK DRS is coming, would people actually use a digital version of "Pfand"?</em></p>
                                <p className="mb-6">The replies weren't just hype — they were practical: convenience, culture change, and how digital refunds should work day to day. That feedback helps shape what we build first.</p>
                                <div className="pt-2">
                                    <a href="#contact-feedback" className="text-sm font-bold hover:underline text-[#00B01A] inline-flex items-center gap-1">
                                        Help shape the pilot <span>→</span>
                                    </a>
                                </div>
                            </Accordion>
                        </div>
                    </Card>

                </div>
            </div>
        </section>
    );
}
