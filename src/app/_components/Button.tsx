"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  form?: string;
  border?: boolean;
  color?: "black" | "blue";
};

export default function Button({
  children,
  onClick = () => {},
  type = "submit",
  form,
  border,
  color,
}: Props) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      className={`rounded-full border px-8 py-2 ${border ? "border border-black" : ""} ${color === "black" && "bg-black text-white hover:bg-slate-800"} ${color === "blue" && "bg-blue-500 text-white hover:bg-blue-600"} ${color === undefined && "bg-white hover:bg-slate-200"} `}
    >
      {children}
    </button>
  );
}
