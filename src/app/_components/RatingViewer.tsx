import React, { useState } from "react";

type Props = {
  rating: number;
};

export default function RatingViewer({ rating }: Props) {
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span className={`${starValue > rating ? "text-gray-300" : "text-yellow-400"} text-base`} key={index}>
            &#9733;
          </span>
        );
      })}
    </div>
  );
}
