import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { Star } from "lucide-react";
type Props = {
  rating: number;
};

export default function RatingViewer({ rating }: Props) {
  return (
    <Badge variant="outline" className="gap-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            className={`h-3.5 w-3.5 ${starValue > rating ? "text-muted-foreground/30" : "fill-primary text-primary"} `}
            key={index}
          >
            &#9733;
          </Star>
        );
      })}
    </Badge>
  );
}
