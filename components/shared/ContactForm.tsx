"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, CornerDownRight } from "lucide-react";

// Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvenypr";

const formSchema = z.object({
    persona: z.enum(["consumer", "retailer", "partner", "feedback"]),
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Please tell us a bit more"),
    company: z.string().optional(),
    role: z.string().optional(),
});

type ContactFormData = z.infer<typeof formSchema>;

interface ContactFormProps {
    defaultPersona?: "consumer" | "retailer" | "partner" | "feedback";
}

export function ContactForm({ defaultPersona }: ContactFormProps) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            persona: defaultPersona || "consumer",
        },
    });

    // Listen for URL hash changes to auto-select persona
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === "#contact-consumer") {
                setValue("persona", "consumer");
            } else if (hash === "#contact-retailer") {
                setValue("persona", "retailer");
            } else if (hash === "#contact-partner") {
                setValue("persona", "partner");
            } else if (hash === "#contact-feedback") {
                setValue("persona", "feedback");
            }
        };

        // Check on mount
        handleHashChange();

        // Listen for changes
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [setValue]);

    // Also update when defaultPersona prop changes
    useEffect(() => {
        if (defaultPersona) {
            setValue("persona", defaultPersona);
        }
    }, [defaultPersona, setValue]);

    const persona = watch("persona");

    const getFormTitle = () => {
        switch (persona) {
            case "consumer": return "Join the Waitlist";
            case "feedback": return "Share Your Feedback";
            case "retailer": return "Partner with us";
            case "partner": return "Invest with us";
            default: return "Get in Touch";
        }
    };

    const getButtonText = () => {
        switch (persona) {
            case "consumer": return "Join Waitlist";
            case "feedback": return "Send Feedback";
            default: return "Send Message";
        }
    };

    const onSubmit = async (data: ContactFormData) => {
        setError(null);

        try {
            // Use FormData format which works reliably on Formspree free tier
            const formData = new window.FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("message", data.message);
            formData.append("persona", data.persona);
            formData.append("company", data.company || "N/A");
            formData.append("role", data.role || "N/A");
            formData.append("_subject", `[EnviroPay] New ${data.persona} inquiry from ${data.name}`);

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Form submission failed");
            }

            setSuccess(true);
            reset();
        } catch (e) {
            setError("Something went wrong. Please try again.");
        }
    };

    if (success) {
        return (
            <div className="py-16 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-[#00B01A] text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#00B01A]/20">
                    <CheckCircle2 size={40} fill="currentColor" strokeWidth={0} />
                </div>
                <h3 className="text-3xl font-bold font-display text-[#163841]">Message In Bottle!</h3>
                <p className="text-[#163841]/60 text-lg">
                    (Just kidding, it's digital). We'll get back to you shortly.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-[#00B01A] font-bold hover:text-[#163841] transition-colors mt-4 flex items-center justify-center gap-2 mx-auto"
                >
                    Send another
                    <ArrowRight size={16} strokeWidth={3} />
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            {/* Hidden Scroll Anchors */}
            <div id="contact-consumer" className="absolute -top-32" />
            <div id="contact-retailer" className="absolute -top-32" />
            <div id="contact-partner" className="absolute -top-32" />
            <div id="contact-feedback" className="absolute -top-32" />

            <div className="text-center mb-10">
                <h3 className="text-3xl font-bold font-display text-[#163841] mb-2">{getFormTitle()}</h3>
                <p className="text-[#163841]/60">Select an option below to get started.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

                {/* Persona Selection - Text based */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[
                            { value: "consumer", label: "Consumer" },
                            { value: "retailer", label: "Retailer" },
                            { value: "partner", label: "Partner" },
                            { value: "feedback", label: "Feedback" }
                        ].map((p) => (
                            <button
                                key={p.value}
                                type="button"
                                onClick={() => setValue("persona", p.value as any)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-base transition-all duration-300 border",
                                    persona === p.value
                                        ? "bg-[#163841] text-white border-[#163841] font-bold shadow-lg transform scale-105"
                                        : "bg-transparent text-[#163841]/60 border-[#163841]/20 hover:border-[#163841]/50 hover:text-[#163841]"
                                )}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hidden persona field for form submission */}
                <input type="hidden" {...register("persona")} />

                {/* Input Fields - Underlined Minimalist Style */}
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="group space-y-2">
                            <label className="text-sm font-bold text-[#00B01A] opacity-0 group-focus-within:opacity-100 transition-opacity uppercase tracking-wider">Name</label>
                            <input
                                {...register("name")}
                                className="w-full py-4 bg-transparent border-b-2 border-[#163841]/20 text-[#163841] text-xl placeholder:text-[#163841]/40 focus:border-[#00B01A] focus:outline-none transition-all"
                                placeholder="Your Name"
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="group space-y-2">
                            <label className="text-sm font-bold text-[#00B01A] opacity-0 group-focus-within:opacity-100 transition-opacity uppercase tracking-wider">Email</label>
                            <input
                                {...register("email")}
                                className="w-full py-4 bg-transparent border-b-2 border-[#163841]/20 text-[#163841] text-xl placeholder:text-[#163841]/40 focus:border-[#00B01A] focus:outline-none transition-all"
                                placeholder="Email Address"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    {(persona === "retailer" || persona === "partner") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 animate-in fade-in slide-in-from-top-4">
                            <div className="group space-y-2">
                                <label className="text-sm font-bold text-[#00B01A] opacity-0 group-focus-within:opacity-100 transition-opacity uppercase tracking-wider">Company</label>
                                <input
                                    {...register("company")}
                                    className="w-full py-4 bg-transparent border-b-2 border-[#163841]/20 text-[#163841] text-xl placeholder:text-[#163841]/40 focus:border-[#00B01A] focus:outline-none transition-all"
                                    placeholder="Company Name"
                                />
                            </div>
                            <div className="group space-y-2">
                                <label className="text-sm font-bold text-[#00B01A] opacity-0 group-focus-within:opacity-100 transition-opacity uppercase tracking-wider">Role</label>
                                <input
                                    {...register("role")}
                                    className="w-full py-4 bg-transparent border-b-2 border-[#163841]/20 text-[#163841] text-xl placeholder:text-[#163841]/40 focus:border-[#00B01A] focus:outline-none transition-all"
                                    placeholder="Job Title"
                                />
                            </div>
                        </div>
                    )}

                    <div className="group space-y-2">
                        <label className="text-sm font-bold text-[#00B01A] opacity-0 group-focus-within:opacity-100 transition-opacity uppercase tracking-wider">Message</label>
                        <textarea
                            {...register("message")}
                            className="w-full py-4 bg-transparent border-b-2 border-[#163841]/20 text-[#163841] text-xl placeholder:text-[#163841]/40 focus:border-[#00B01A] focus:outline-none transition-all min-h-[100px] resize-none"
                            placeholder={persona === "feedback" ? "Tell us what matters to you..." : "How can we help?"}
                        />
                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-4 text-red-600 bg-red-50 p-4 border-l-2 border-red-500 rounded-r-lg">
                        <AlertCircle size={20} strokeWidth={2.5} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative px-10 py-5 bg-[#00B01A] text-white font-bold text-xl rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00B01A]/20"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    {getButtonText()}
                                    <CornerDownRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-[#008f15] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </div>
            </form>
        </div>
    );
}
