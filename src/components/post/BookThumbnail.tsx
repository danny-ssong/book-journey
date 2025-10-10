import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  thumbnailUrl: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function BookThumbnail({
  title,
  thumbnailUrl,
  width = 120,
  height = 174,
  className,
}: Props) {
  return (
    <figure
      className={cn("overflow-hidden rounded-md border", className)}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        width={width}
        height={height}
        className="h-full w-full object-cover"
      />
    </figure>
  );
}
