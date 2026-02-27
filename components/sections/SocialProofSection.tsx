"use client";

import { cn } from "@/lib/utils";
import { Star, MessageSquare, Heart, Recycle, ThumbsUp, ArrowUp, Send, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { submitLead } from "@/lib/firebase";
import { submitToFormspree } from "@/lib/formspree";

// Curated Review Data
const REVIEWS = [
    {
        id: 1,
        user: "Tech_Enthusiast_",
        highlight: "If it links to my bank for direct refunds, yes. I hate carrying paper vouchers that I forget to use. This makes way more sense in 2025.",
        icon: ThumbsUp,
        rating: 5,
        upvotes: 245
    },
    {
        id: 2,
        user: "EcoWarrior_2025",
        highlight: "I've been hauling bottles to the supermarket for years. The idea of scanning at home and dropping off at a local point? Total no-brainer.",
        icon: Recycle,
        upvotes: 167
    },
    {
        id: 3,
        user: "Uncertain_Pineapple",
        highlight: "Definitely. The queues at RVMs in Germany can be annoying. If I could just scan and bin at home or a specific bin, I'd do it 100%.",
        rating: 5,
        upvotes: 189
    },
    {
        id: 4,
        user: "dave_the_rave",
        highlight: "I'd use it. The RVMs at my local Tesco are always broken or full. It's a nightmare trying to return things when the machine is down.",
        icon: MessageSquare,
        upvotes: 402
    },
    {
        id: 5,
        user: "Busy_Mum_UK",
        highlight: "With 3 kids, carrying bags of sticky bottles to a machine is a nightmare. A home collection or kerbside scan would be a lifesaver.",
        rating: 5,
        variant: "highlight",
        upvotes: 892
    },
    {
        id: 6,
        user: "PlanetPenny",
        highlight: "My kids love the idea of seeing how much plastic they've saved. If this becomes a family challenge feature... instant download.",
        icon: Heart,
        rating: 5,
        upvotes: 276
    },
    {
        id: 7,
        user: "London_Lad_99",
        highlight: "Would stop people raiding bins if they can't claim the deposit physically. That's a crucial point for city living.",
        icon: Recycle,
        upvotes: 315
    },
    {
        id: 8,
        user: "Sarah_J_88",
        highlight: "As long as the app is fast. I don't want to stand there scanning 50 bottles one by one. But if it's bulk scan? Game changer.",
        upvotes: 124
    },
    {
        id: 9,
        user: "Green_Tea_Sipp",
        highlight: "I like the idea of tracking my impact. Seeing how much plastic I've saved would be a nice gamification element.",
        icon: Heart,
        upvotes: 88
    },
    {
        id: 10,
        user: "Vegetable-Ad8126",
        highlight: "Mixed feelings. RVMs are great because you get the voucher immediately. A digital solution usually means waiting for payout... I'd use it if it was instant.",
        icon: MessageSquare,
        upvotes: 56
    }
];

// Featured Reviews for Carousel
const FEATURED_REVIEWS = [
    REVIEWS[4], // Busy Mum
    REVIEWS[6], // London Lad (Societal)
    REVIEWS[3], // Broken Machines
];


export function SocialProofSection() {
    return (
        <section className="py-24 lg:py-32 bg-[#F4F7F5] relative overflow-hidden">
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Fade Overlay Top/Bottom */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F4F7F5] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F4F7F5] to-transparent z-20 pointer-events-none" />


            <div className="container mx-auto px-4 relative z-10 text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-[#163841] mb-6 leading-tight">
                    We asked the UK: <br />
                    <span className="text-[#00B01A]">"Would you use this?"</span>
                </h2>
                <p className="text-xl text-[#163841]/70 max-w-2xl mx-auto leading-relaxed">
                    We shared the concept of "Digital Pfand" online. Thousands of views and hundreds of practical comments later, the answer was clear: <strong>The UK is ready for a smarter way to recycle.</strong>
                </p>
            </div>

            <div className="container mx-auto px-4 relative z-10 h-[800px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">

                    {/* LEFT: Marquee */}
                    <MarqueeColumn
                        items={REVIEWS.slice(0, 4)}
                        speed={45}
                        className="hidden lg:flex"
                    />

                    {/* CENTER: Static Column (Feedback + Carousel) */}
                    {/* Use 'flex-1' and 'min-h-0' to manage height properly in Grid */}
                    <div className="flex flex-col gap-6 h-full relative z-30">

                        {/* 1. FEEDBACK FORM - Given more height flexibility */}
                        <div className="flex-1 min-h-[400px]">
                            <FeedbackCard />
                        </div>

                        {/* 2. FEATURED CAROUSEL - Consolidated Dark Card */}
                        <div className="h-auto">
                            <FeaturedCarousel items={FEATURED_REVIEWS} />
                        </div>

                    </div>

                    {/* RIGHT: Marquee */}
                    <MarqueeColumn
                        items={REVIEWS.slice(6)}
                        speed={55}
                        className="hidden md:flex"
                    />

                </div>
            </div>

            <style jsx global>{`
                @keyframes scroll-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                .animate-scroll-up {
                    animation: scroll-up linear infinite;
                }
                .mask-linear-fade {
                    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
}

// ---- COMPONENTS ----

function MarqueeColumn({ items, speed, className }: { items: any[], speed: number, className?: string }) {
    // Duplicate items for seamless loop
    const loopedItems = [...items, ...items, ...items, ...items];

    return (
        <div className={cn("relative h-full overflow-hidden flex flex-col mask-linear-fade", className)}>
            <div
                className="flex flex-col gap-6 animate-scroll-up hover:[animation-play-state:paused]"
                style={{ animationDuration: `${speed}s` }}
            >
                {loopedItems.map((item, i) => (
                    <div key={i} className="transform transition-transform hover:scale-[1.02]">
                        {item.type === 'image' ? (
                            <ImageCard src={item.src} alt={item.alt} height={item.height} />
                        ) : (
                            <ReviewCard {...item} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function FeedbackCard() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [likes, setLikes] = useState(1240);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const message = formData.get("message") as string;
        const email = formData.get("email") as string;

        try {
            // 1. PRIMARY: Submit to Firestore
            await submitLead({
                type: "contact",
                persona: "consumer",
                email: email || "anonymous@feedback.enviropay.uk",
                message: message,
                source: "feedback_card",
            });

            // 2. SECONDARY: Submit to Formspree for email notification
            submitToFormspree({
                name: "Feedback Card",
                email: email || "anonymous@feedback.enviropay.uk",
                persona: "consumer",
                type: "contact",
                message: message,
                source: "feedback_card",
                _subject: "[EnviroPay] Quick Feedback Card Submission",
            });

            setIsSubmitted(true);
            setLikes(likes + 1);
            form.reset();
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            console.error("Feedback submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full rounded-[2rem] bg-[#00B01A] text-white p-8 shadow-xl transform transition-transform border border-white/10 relative overflow-hidden group flex flex-col">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                        <MessageSquare size={24} fill="currentColor" strokeWidth={0} />
                    </div>
                    <h3 className="font-display font-bold text-2xl">Good! Do Something.</h3>
                </div>

                <p className="mb-6 text-white/90 leading-relaxed text-lg">
                    Have an idea for the pilot? Join <strong>{likes.toLocaleString()}</strong> others shaping the future of EnviroPay.
                </p>

                {isSubmitted ? (
                    <div className="flex-1 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                        <div>
                            <div className="inline-block p-4 bg-[#86E70F] text-[#0D2538] rounded-full mb-4 shadow-lg">
                                <Heart size={32} fill="currentColor" strokeWidth={0} />
                            </div>
                            <h4 className="font-bold text-xl mb-2">Feedback Sent!</h4>
                            <p className="text-white/80">Thanks for being part of the change.</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                        <textarea
                            name="message"
                            placeholder="I mainly shop at Tesco and..."
                            className="flex-1 w-full bg-white/10 border border-white/20 rounded-[2.5rem] p-6 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none text-base"
                            required
                        />
                        <div className="relative group/email">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email (optional)"
                                className="w-full bg-white/10 border border-white/20 rounded-full p-4 pr-12 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-base transition-all"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                                <div className="group/tooltip relative">
                                    <Info size={20} className="text-white/40 hover:text-white cursor-help transition-colors" />
                                    <div className="absolute bottom-full right-0 mb-3 w-48 p-3 bg-[#163841] border border-white/10 text-white text-xs rounded-xl shadow-xl opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 origin-bottom-right z-50">
                                        <p className="font-semibold mb-1 text-[#86E70F]">Why add your email?</p>
                                        <p className="opacity-80 leading-relaxed">Get early access to the pilot app and exclusive tester rewards.</p>
                                        <div className="absolute -bottom-1 right-1.5 w-2 h-2 bg-[#163841] border-b border-r border-white/10 rotate-45 transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-[#00B01A] font-bold py-4 rounded-full hover:bg-[#F0FDF4] transition-colors flex items-center justify-center gap-2 shadow-lg text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#00B01A]" />
                            ) : (
                                <>
                                    <Send size={20} strokeWidth={2.5} />
                                    Post Feedback
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

function FeaturedCarousel({ items }: { items: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

    // Auto-rotate
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    const currentItem = items[currentIndex];

    return (
        <div className="relative rounded-[2rem] bg-[#163841] text-white p-8 border border-white/5 shadow-lg overflow-hidden h-[300px] flex flex-col justify-center">
            {/* Nav Arrows */}
            <div className="absolute top-6 right-6 flex gap-2 z-20">
                <button onClick={prevSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <ChevronLeft size={16} />
                </button>
                <button onClick={nextSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="relative z-10">
                <div key={currentIndex} className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
                            {currentItem.user[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white/60">FEATURED REVIEW</p>
                            <p className="font-bold">u/{currentItem.user}</p>
                        </div>
                    </div>

                    <p className="text-xl font-medium leading-relaxed mb-4">
                        "{currentItem.highlight}"
                    </p>

                    <div className="flex items-center gap-4 text-sm font-medium text-[#86E70F]">
                        <span className="flex items-center gap-1">
                            <Star size={14} fill="currentColor" strokeWidth={0} /> {currentItem.rating}/5
                        </span>
                        <span className="flex items-center gap-1">
                            <ArrowUp size={14} strokeWidth={3} /> {currentItem.upvotes} Upvotes
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
                <div
                    className="h-full bg-[#86E70F] transition-all duration-300 ease-linear"
                    style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
                />
            </div>
        </div>
    );
}


function ReviewCard({ user, highlight, rating, icon: Icon, variant = "default", upvotes = 0 }: any) {
    const [votes, setVotes] = useState(upvotes);
    const [hasVoted, setHasVoted] = useState(false);

    const handleVote = () => {
        if (!hasVoted) {
            setVotes(votes + 1);
            setHasVoted(true);
        }
    };

    return (
        <div className={cn(
            "rounded-2xl p-6 shadow-sm transition-all duration-300 border relative group",
            variant === "highlight"
                ? "bg-[#163841] text-white border-[#163841]"
                : "bg-white text-[#163841] border-black/5"
        )}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold", variant === "highlight" ? "bg-white/10" : "bg-gray-100")}>
                        {user ? user[0].toUpperCase() : "U"}
                    </div>
                    <span className={cn("text-xs font-bold", variant === "highlight" ? "text-white/60" : "text-[#163841]/60")}>u/{user}</span>
                </div>
                {Icon && <Icon size={16} className={variant === "highlight" ? "text-[#86E70F]" : "text-[#00B01A]"} />}
            </div>
            <p className={cn("font-medium leading-relaxed mb-4", variant === "highlight" ? "text-white/90" : "text-[#163841]/80")}>
                "{highlight}"
            </p>

            <div className="flex items-center justify-between">
                {rating ? (
                    <div className="flex gap-0.5">
                        {[...Array(rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" strokeWidth={0} className="text-[#FFB800]" />
                        ))}
                    </div>
                ) : <span />}

                <button
                    onClick={handleVote}
                    className={cn(
                        "flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full transition-all active:scale-90",
                        hasVoted || variant === "highlight"
                            ? "bg-[#86E70F]/20 text-[#86E70F]"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    )}
                >
                    <ArrowUp size={14} strokeWidth={3} className={hasVoted ? "animate-bounce" : ""} />
                    {votes}
                </button>
            </div>
        </div>
    );
}

function ImageCard({ src, alt, height }: { src: string, alt: string, height: string }) {
    return (
        <div className={cn("rounded-2xl overflow-hidden shadow-sm transition-all duration-300 border border-black/5 relative group", height)}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        </div>
    );
}
