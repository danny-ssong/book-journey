"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
};

export default function Button({ children, onClick = () => {}, type = "submit" }: Props) {
  return (
    <button
      type={type}
      onClick={() => {
        onClick();
      }}
      className="px-4 py-2 border border-black rounded-full hover:bg-slate-200 bg-white"
    >
      {children}
    </button>
  );
}
