import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface NeuInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const NeuInput = forwardRef<HTMLInputElement, NeuInputProps>(
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
        <input
          ref={ref}
          id={id}
          className={cn(
            "neu-input w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground",
            "focus:outline-none transition-all duration-200",
            "border-none bg-background",
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

NeuInput.displayName = "NeuInput";

export { NeuInput };
