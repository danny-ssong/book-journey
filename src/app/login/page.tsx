"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google`;
  }, []);

  return <p>Redirecting...</p>;
}
