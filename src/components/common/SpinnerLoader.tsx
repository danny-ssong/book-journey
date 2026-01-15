import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type SpinnerLoaderProps = {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeStyles = {
  sm: {
    icon: "h-4 w-4",
    text: "text-sm",
    padding: "py-4",
  },
  md: {
    icon: "h-5 w-5",
    text: "text-base",
    padding: "py-6",
  },
  lg: {
    icon: "h-6 w-6",
    text: "text-lg",
    padding: "py-8",
  },
};

export default function SpinnerLoader({
  text = "로딩 중...",
  size = "sm",
  className,
}: SpinnerLoaderProps) {
  const styles = sizeStyles[size];

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-muted-foreground",
        styles.padding,
        className
      )}
    >
      <Loader2 className={cn("animate-spin", styles.icon)} />
      <span className={styles.text}>{text}</span>
    </div>
  );
}

