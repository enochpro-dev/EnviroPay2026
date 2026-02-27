import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "rounded-lg border border-border/50 bg-card text-card-foreground transition-all duration-300",
                "shadow-[var(--shadow-premium)] hover:shadow-[var(--shadow-float)] hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
