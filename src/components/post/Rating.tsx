"use client";

import React, { useState } from "react";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  rating: number;
  onClickStar?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
};

export default function Rating({ rating, onClickStar, size = "sm" }: Props) {
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex items-center gap-0.5" aria-label={`평점 ${rating}점`}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        const starClassName = cn(
          sizeClass[size],
          isFilled ? "fill-primary text-primary" : "text-muted-foreground/30",
          onClickStar && "cursor-pointer",
        );

        return (
          <Star
            className={starClassName}
            key={index}
            onClick={() => onClickStar?.(starValue)}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
