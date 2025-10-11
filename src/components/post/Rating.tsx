"use client";

import React, { useState } from "react";

import { Star } from "lucide-react";

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
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            className={`${starValue > rating ? "text-muted-foreground/30" : "fill-primary text-primary"} ${sizeClass[size]} ${onClickStar ? "cursor-pointer" : ""}`}
            key={index}
            onClick={() => onClickStar?.(starValue)}
          />
        );
      })}
    </div>
  );
}
