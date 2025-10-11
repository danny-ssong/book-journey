import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

export default function PostFormFooter() {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <footer className="fixed bottom-0 left-0 flex w-full justify-end bg-secondary p-4">
      <Button
        type="submit"
        className="w-24 rounded-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "저장중..." : "저장"}
      </Button>
    </footer>
  );
}
