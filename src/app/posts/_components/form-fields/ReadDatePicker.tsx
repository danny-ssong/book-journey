"use client";

import { useId } from "react";

import { Controller, useFormContext } from "react-hook-form";

import MonthPicker from "@/components/common/MonthPicker";

export default function ReadDatePicker() {
  const { control } = useFormContext();
  const id = useId();

  return (
    <Controller
      name="startDate"
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="flex items-center gap-2">
          <p className="text-xs" id={id}>
            읽은 날짜
          </p>
          <MonthPicker date={value} setDate={onChange} aria-labelledby={id} />
        </div>
      )}
    />
  );
}
