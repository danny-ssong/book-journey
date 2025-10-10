import { cn } from "@/lib/utils";

type Props = {
  text: string;
  id?: string;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

const variantMap: Record<Props["variant"], string> = {
  h1: "text-2xl font-bold",
  h2: "text-xl font-bold",
  h3: "text-lg font-bold",
  h4: "text-base font-bold",
  h5: "text-sm font-bold",
  h6: "text-xs font-bold",
};

export default function Heading({ text, id, variant, className }: Props) {
  const Tag = variant;

  return (
    <Tag id={id} className={cn(variantMap[variant], className)}>
      {text}
    </Tag>
  );
}
