import { useEffect } from "react";

export function useBeforeunload(isDirty: boolean) {
  useEffect(() => {
    const preventClose = (e: any) => {
      if (isDirty) e.preventDefault();
    };

    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, [isDirty]);
}
