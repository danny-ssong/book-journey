import React from "react";

import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

export default function PrivacySelector() {
  const { control } = useFormContext();

  return (
    <Controller
      name="isPrivate"
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="text-right">
          <select
            aria-label="공개 범위"
            value={value ? "private" : "public"}
            onChange={(e) => onChange(e.target.value === "private")}
            className={cn("w-24 rounded-lg border px-2 py-1")}
          >
            <option value="private">비공개</option>
            <option value="public">공개</option>
          </select>
        </div>
      )}
    />
  );
}
