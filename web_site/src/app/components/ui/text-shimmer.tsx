import { cn } from "@/lib/utils";
import { CSSProperties, FC, ReactNode } from "react";

interface TextShimmerProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

const TextShimmer: FC<TextShimmerProps> = ({
  children,
  className,
  shimmerWidth = 100,
}) => {
  return (
    <p
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-400/50",

        // Shimmer effect
        "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

        // Shimmer gradient
        "bg-gradient-to-r from-neutral-900 via-white/80 to-neutral-900",

        className,
      )}
    >
      {children}
    </p>
  );
};

export default TextShimmer;
