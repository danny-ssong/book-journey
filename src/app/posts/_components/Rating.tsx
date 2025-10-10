import React, { useState } from "react";

import { Star } from "lucide-react";

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
            className={`${starValue > rating ? "text-muted-foreground/30" : "fill-primary text-primary"} h-4 w-4 cursor-pointer sm:h-6 sm:w-6`}
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
