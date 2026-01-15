import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/lib/utils";

type LoadingProps = {
  text?: string;
  variant?: "card" | "inline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeStyles = {
  sm: { icon: "size-4", text: "text-sm", padding: "py-4" },
  md: { icon: "size-5", text: "text-base", padding: "py-6" },
  lg: { icon: "size-6", text: "text-lg", padding: "py-8" },
};

export default function Loading({
  text = "로딩 중...",
  variant = "card",
  size = "sm",
  className,
}: LoadingProps) {
  const styles = sizeStyles[size];

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 text-muted-foreground",
          styles.padding,
          className,
        )}
      >
        <Spinner className={styles.icon} />
        <span className={styles.text}>{text}</span>
      </div>
    );
  }

  return (
    <div
      className={cn("flex w-full flex-col gap-4 [--radius:1rem]", className)}
    >
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{text}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
