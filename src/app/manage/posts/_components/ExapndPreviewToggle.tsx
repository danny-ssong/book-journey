"use client";

import { useState } from "react";

export default function ExapndPreviewToggle() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
      </svg>
    </div>
  );
}
