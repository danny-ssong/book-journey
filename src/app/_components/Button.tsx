"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  border?: boolean;
  color?: "black" | "blue";
};

export default function Button({
  border,
  color,
  className = "",
  ...props
}: Props) {
  return (
    <button
      className={`rounded-full border px-8 py-2 ${border ? "border border-black" : ""} ${color === "black" && "bg-black text-white hover:bg-slate-800"} ${color === "blue" && "bg-blue-500 text-white hover:bg-blue-600"} ${color === undefined && "bg-white hover:bg-slate-200"} ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
