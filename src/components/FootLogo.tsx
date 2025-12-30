import { Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

interface FootLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const FootLogo = ({ size = "md", showText = true, className }: FootLogoProps) => {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-2xl" },
    xl: { icon: 64, text: "text-3xl" },
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="neu-circle p-3 bg-primary/10">
        <Footprints 
          size={sizes[size].icon} 
          className="text-primary" 
          strokeWidth={1.5}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-heading font-semibold text-foreground", sizes[size].text)}>
            Clara Maria
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            Di Nofa • Podologa
          </span>
        </div>
      )}
    </div>
  );
};

export { FootLogo };
