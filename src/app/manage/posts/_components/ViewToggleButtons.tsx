"use client";

import { Button } from "@/components/ui/button";

type Props = {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
};

export default function ViewToggleButtons({
  isExpanded,
  setIsExpanded,
}: Props) {
  return (
    <div className="flex items-center">
      <Button
        size="sm"
        className={`p-2 ${isExpanded && "bg-secondary"}`}
        onClick={() => setIsExpanded(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#5f6368"
        >
          <path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z" />
        </svg>
      </Button>
      <Button
        size="sm"
        className={`p-2 ${!isExpanded && "bg-secondary"}`}
        onClick={() => setIsExpanded(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#5f6368"
        >
          <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
        </svg>
      </Button>
    </div>
  );
}
