"use client";

import * as React from "react";

import dayjs from "dayjs";
import "dayjs/locale/ko";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

export default function MonthPicker({ date, setDate, ...props }: Props) {
  const [open, setOpen] = React.useState(false);
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear(),
  );

  const months = Array.from({ length: 12 }, (_, i) => new Date(currentYear, i));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild {...props}>
        <Button variant="outline">{dayjs(date).format("YYYY년 M월")}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" aria-label="월 선택 달력">
        <div className="mb-2 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentYear(currentYear - 1)}
            aria-label="이전 년도"
          >
            ←
          </Button>
          <span className="font-semibold">{currentYear}년</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentYear(currentYear + 1)}
            aria-label="다음 년도"
          >
            →
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {months.map((month, idx) => (
            <Button
              key={idx}
              variant={
                date.getMonth() === month.getMonth() &&
                date.getFullYear() === month.getFullYear()
                  ? "default"
                  : "outline"
              }
              onClick={() => {
                setDate(month);
                setOpen(false);
              }}
              aria-label={`${idx + 1}월`}
            >
              {dayjs(month).locale("ko").format("M월")}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
