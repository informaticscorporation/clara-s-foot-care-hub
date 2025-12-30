import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface NeuTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const NeuTextarea = forwardRef<HTMLTextAreaElement, NeuTextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "neu-input w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground",
            "focus:outline-none transition-all duration-200 resize-none",
            "border-none bg-background min-h-[120px]",
            error && "ring-2 ring-destructive/50",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

NeuTextarea.displayName = "NeuTextarea";

export { NeuTextarea };
