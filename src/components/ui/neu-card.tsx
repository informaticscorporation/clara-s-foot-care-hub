import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface NeuCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "flat" | "convex" | "pressed";
  size?: "sm" | "md" | "lg";
  hover?: boolean;
}

const NeuCard = forwardRef<HTMLDivElement, NeuCardProps>(
  ({ className, variant = "flat", size = "md", hover = false, children, ...props }, ref) => {
    const variants = {
      flat: "neu-card",
      convex: "neu-convex rounded-2xl",
      pressed: "neu-pressed rounded-2xl",
    };

    const sizes = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          sizes[size],
          hover && "transition-all duration-300 hover:scale-[1.02] cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeuCard.displayName = "NeuCard";

export { NeuCard };
