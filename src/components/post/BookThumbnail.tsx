import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  thumbnailUrl: string;
  className?: string;
};

export default function BookThumbnail({
  title,
  thumbnailUrl,
  className,
}: Props) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-md border",
        "w-[80px] h-[116px] sm:w-[120px] sm:h-[174px]",
        className,
      )}
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 80px, 120px"
        className="object-cover"
      />
    </figure>
  );
}
