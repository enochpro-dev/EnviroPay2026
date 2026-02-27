"use client";

import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitLead } from "@/lib/firebase";
import type { LeadPersona, LeadType, LeadSource } from "@/lib/firebase";
import { submitToFormspree } from "@/lib/formspree";

gsap.registerPlugin(ScrollTrigger);

// ─── Validation Schema ───
const contactSchema = z.object({
    persona: z.enum(["consumer", "retailer", "partner"]),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().optional(),
    company: z.string().optional(),
    role: z.string().optional(),
    honeypot: z.string().max(0), // Bot trap — must remain empty
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Persona Config ───
const PERSONAS = [
    { value: "consumer" as const, label: "I'm a consumer" },
    { value: "retailer" as const, label: "I'm a retailer" },
    { value: "partner" as const, label: "I'm a partner" },
] as const;

function getSubmitLabel(persona: LeadPersona): string {
    switch (persona) {
        case "consumer": return "Join Waitlist";
        case "retailer": return "Partner With Us";
        case "partner": return "Get in Touch";
    }
}

function getLeadType(persona: LeadPersona): LeadType {
    return persona === "consumer" ? "waitlist" : "contact";
}

function getFormspreeSubject(persona: LeadPersona, name: string): string {
    const typeLabel = persona === "consumer" ? "Waitlist signup" : `${persona.charAt(0).toUpperCase() + persona.slice(1)} inquiry`;
    return `[EnviroPay] ${typeLabel} from ${name}`;
}

// ─── Component ───
export function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            persona: "consumer",
            name: "",
            email: "",
            message: "",
            company: "",
            role: "",
            honeypot: "",
        },
    });

    const persona = watch("persona");

    // ─── Hash-based persona routing ───
    // Other sections link to #contact-consumer, #contact-retailer, #contact-partner
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === "#contact-consumer" || hash === "#contact") {
                setValue("persona", "consumer");
            } else if (hash === "#contact-retailer") {
                setValue("persona", "retailer");
            } else if (hash === "#contact-partner") {
                setValue("persona", "partner");
            }
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [setValue]);

    // ─── GSAP scroll reveal ───
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("[data-contact-reveal]", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // ─── Dual Submission Handler ───
    const onSubmit = async (data: ContactFormData) => {
        // Honeypot check — bots fill hidden fields
        if (data.honeypot) return;

        setSubmitState("idle");
        setErrorMessage("");

        const leadType = getLeadType(data.persona);
        const source: LeadSource = "contact_form";

        try {
            // 1. PRIMARY: Submit to Firestore (source of truth)
            // Firestore rejects `undefined` — only include fields that have values
            await submitLead({
                type: leadType,
                persona: data.persona,
                email: data.email,
                source,
                ...(data.name ? { name: data.name } : {}),
                ...(data.message ? { message: data.message } : {}),
                ...(data.company ? { company: data.company } : {}),
                ...(data.role ? { role: data.role } : {}),
            });

            // 2. SECONDARY: Submit to Formspree (notifications — fire-and-forget)
            submitToFormspree({
                name: data.name,
                email: data.email,
                persona: data.persona,
                type: leadType,
                message: data.message,
                company: data.company,
                role: data.role,
                source,
                _subject: getFormspreeSubject(data.persona, data.name),
            });

            setSubmitState("success");
            reset();
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Something went wrong. Please try again.";
            setErrorMessage(msg);
            setSubmitState("error");
        }
    };

    // ─── Success State ───
    if (submitState === "success") {
        return (
            <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F8] via-[#E0F2FE] to-[#F0F4F8]" />
                <div className="relative z-10 container mx-auto px-6">
                    <div className="max-w-2xl mx-auto text-center py-16 space-y-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-[#67E8F9] to-[#2563EB] text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#2563EB]/20">
                            <CheckCircle2 size={40} fill="currentColor" strokeWidth={0} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-outfit)] text-[#0B132B]">
                            You&apos;re on the list!
                        </h3>
                        <p className="text-lg text-[#64748B] max-w-md mx-auto">
                            We&apos;ll be in touch soon. Thanks for joining the EnviroPay movement.
                        </p>
                        <button
                            onClick={() => setSubmitState("idle")}
                            className="text-[#0EA5E9] font-bold hover:text-[#0B132B] transition-colors mt-4 flex items-center justify-center gap-2 mx-auto"
                        >
                            Send another
                            <ArrowRight size={16} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // ─── Form State ───
    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-24 lg:py-32 overflow-hidden"
        >
            {/* Hidden scroll anchors for persona routing */}
            <div id="contact-consumer" className="absolute -top-24" />
            <div id="contact-retailer" className="absolute -top-24" />
            <div id="contact-partner" className="absolute -top-24" />

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F8] via-[#E0F2FE] to-[#F0F4F8]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#67E8F9]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12" data-contact-reveal>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-outfit)] text-[#0B132B] tracking-tight mb-4">
                        Let&apos;s <span className="text-[#0EA5E9] italic font-[family-name:var(--font-lora)]">talk</span>
                    </h2>
                    <p className="text-lg text-[#64748B] max-w-md mx-auto">
                        Tell us who you are and we&apos;ll get back to you.
                    </p>
                </div>

                {/* Persona Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-10" data-contact-reveal>
                    {PERSONAS.map((p) => (
                        <button
                            key={p.value}
                            type="button"
                            onClick={() => setValue("persona", p.value)}
                            className={`btn-magnetic px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${persona === p.value
                                ? "bg-[#0B132B] text-white shadow-lg shadow-[#0B132B]/20"
                                : "bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0EA5E9]/40 hover:text-[#0B132B]"
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    data-contact-reveal
                    className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-10 shadow-[0_8px_40px_-12px_rgba(14,165,233,0.12)] border border-white/80"
                    noValidate
                >
                    {/* Honeypot — hidden bot trap */}
                    <input
                        {...register("honeypot")}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                        aria-hidden="true"
                    />

                    {/* Hidden persona field */}
                    <input type="hidden" {...register("persona")} />

                    {/* Name + Email row */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="contact-name" className="block text-sm font-bold text-[#0B132B] mb-2 font-[family-name:var(--font-outfit)]">
                                Name <span className="text-[#0EA5E9]">*</span>
                            </label>
                            <input
                                id="contact-name"
                                {...register("name")}
                                type="text"
                                placeholder="Your name"
                                className="w-full px-4 py-3.5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9]/50 transition-all font-[family-name:var(--font-inter)]"
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="block text-sm font-bold text-[#0B132B] mb-2 font-[family-name:var(--font-outfit)]">
                                Email <span className="text-[#0EA5E9]">*</span>
                            </label>
                            <input
                                id="contact-email"
                                {...register("email")}
                                type="email"
                                placeholder="you@email.com"
                                className="w-full px-4 py-3.5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9]/50 transition-all font-[family-name:var(--font-inter)]"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email.message}</p>}
                        </div>
                    </div>

                    {/* Company + Role (retailers/partners only) */}
                    {(persona === "retailer" || persona === "partner") && (
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="contact-company" className="block text-sm font-bold text-[#0B132B] mb-2 font-[family-name:var(--font-outfit)]">
                                    Company
                                </label>
                                <input
                                    id="contact-company"
                                    {...register("company")}
                                    type="text"
                                    placeholder="Company name"
                                    className="w-full px-4 py-3.5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9]/50 transition-all font-[family-name:var(--font-inter)]"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-role" className="block text-sm font-bold text-[#0B132B] mb-2 font-[family-name:var(--font-outfit)]">
                                    Role
                                </label>
                                <input
                                    id="contact-role"
                                    {...register("role")}
                                    type="text"
                                    placeholder="Your role"
                                    className="w-full px-4 py-3.5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9]/50 transition-all font-[family-name:var(--font-inter)]"
                                />
                            </div>
                        </div>
                    )}

                    {/* Message (retailers/partners only) */}
                    {(persona === "retailer" || persona === "partner") && (
                        <div className="mb-6">
                            <label htmlFor="contact-message" className="block text-sm font-bold text-[#0B132B] mb-2 font-[family-name:var(--font-outfit)]">
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                {...register("message")}
                                rows={4}
                                placeholder="How can we work together?"
                                className="w-full px-4 py-3.5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9]/50 transition-all resize-none font-[family-name:var(--font-inter)]"
                            />
                        </div>
                    )}

                    {/* Error banner */}
                    {submitState === "error" && (
                        <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200 mb-6">
                            <AlertCircle size={20} strokeWidth={2.5} className="shrink-0" />
                            <span className="text-sm">{errorMessage}</span>
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-magnetic group w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#67E8F9] to-[#2563EB] text-white shadow-lg shadow-[#2563EB]/20 hover:shadow-[#2563EB]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <>
                                <Sparkles size={16} fill="currentColor" strokeWidth={0} />
                                {getSubmitLabel(persona)}
                                <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* Trust line */}
                <p data-contact-reveal className="text-center text-sm text-[#94A3B8] mt-8 font-[family-name:var(--font-ibm-plex-mono)]">
                    No spam. Unsubscribe anytime. We respect your data.
                </p>
            </div>
        </section>
    );
}
