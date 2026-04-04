import { Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

interface FootLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  imageAlt?: string;
}

const FootLogo = ({
  size = "md",
  showText = true,
  className,
  imageAlt = "Logo podologa Clara Maria Di Nofa - foot care Cardito e Caserta",
}: FootLogoProps) => {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-2xl" },
    xl: { icon: 64, text: "text-3xl" },
  };
  

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="neu-circle p-3 bg-primary/10">
        <img
          src="/logo.png"
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          style={{ width: sizes[size].icon }}
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
