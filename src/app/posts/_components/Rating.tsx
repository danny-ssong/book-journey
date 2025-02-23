import { Star } from "lucide-react";
import React, { useState } from "react";

type Props = {
  rating: number;
  onClickStar?: (rating: number) => void;
};

export default function Rating({ rating, onClickStar }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            className={`${starValue > rating ? "text-muted-foreground/30" : "fill-primary text-primary"} cursor-pointer text-2xl`}
            key={index}
            onClick={onClickStar ? () => onClickStar(starValue) : undefined}
          >
            &#9733;
          </Star>
        );
      })}
    </div>
  );
}
