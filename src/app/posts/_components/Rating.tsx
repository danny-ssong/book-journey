import React, { useState } from "react";

type Props = {
  rating: number;
  onClickStar?: (rating: number) => void;
};

export default function Rating({ rating, onClickStar }: Props) {
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            className={`${starValue > rating ? "text-gray-300" : "text-yellow-400"} cursor-pointer text-3xl `}
            key={index}
            onClick={onClickStar ? () => onClickStar(starValue) : undefined}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}
