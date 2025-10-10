import { useEffect } from "react";

export function useBeforeunload() {
  useEffect(() => {
    const preventClose = (e: any) => {
      e.preventDefault();
      //   e.returnValue = "";
    };

    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
}

// export function useUnsavedChangesWarning() {
//   useEffect(() => {
//     const handleBeforeUnload = (e: any) => {
//       e.preventDefault();
//       //   e.returnValue = "";
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);
// }
