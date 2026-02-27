"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, Minus } from "lucide-react";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
    onToggle?: (isOpen: boolean) => void;
}

export function Accordion({ title, children, defaultOpen = false, className, onToggle }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onToggle?.(newState);
    };

    return (
        <div className={cn("border-t border-border/50", className)}>
            <button
                onClick={handleToggle}
                className="flex w-full items-center justify-between py-4 text-left group transition-colors"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-sm tracking-tight">{title}</span>
                <span className="opacity-60 group-hover:opacity-100 transition-colors">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
            </button>
            <div
                className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] pb-0 opacity-0"
                )}
            >
                <div className="overflow-hidden">
                    <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
