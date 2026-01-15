import Link from "next/link";

import { BookX, Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <BookX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-3">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              홈으로
            </Link>
          </Button>
          <Button asChild>
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />책 검색
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
