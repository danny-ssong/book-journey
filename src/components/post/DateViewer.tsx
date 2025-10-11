"use client";

import { useId } from "react";

import dayjs from "dayjs";

import { cn } from "@/lib/utils";

type Props = {
  date: Date;
  label?: string;
  className?: string;
};

export default function DateViewer({ date, label, className }: Props) {
  const id = useId();

  return (
    <div
      className={cn(
        "flex items-center gap-2 whitespace-nowrap text-muted-foreground",
        className,
      )}
    >
      <span className="text-xs" id={id}>
        {label}
      </span>
      <time dateTime={date.toString()} aria-labelledby={id}>
        {dayjs(date).format("YYYY-MM-DD")}
      </time>
    </div>
  );
}
