"use client";

import { useEffect } from "react";

import { AlertCircle, Home, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">문제가 발생했습니다</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              {error.message || "예상치 못한 오류가 발생했습니다."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="mr-2 h-4 w-4" />
            홈으로
          </Button>
          <Button onClick={() => reset()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            다시 시도
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
