"use client";

import HeaderNavLinks from "./HeaderNavLinks";
import BookSearchArea from "./MainBookSearchInput";
import UserLoginStatus from "./UserLoginStatus";
import ThemeModeToggle from "./ThemeModeToggle";
import MobileMenuButton from "./MobileMenuButton";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="hidden sm:block">
        <DesktopHeader />
      </div>
      <div className="block sm:hidden">
        <MobileHeader />
      </div>
    </>
  );
}

function DesktopHeader() {
  return (
    <header className="fixed flex min-h-16 w-full items-center justify-between border bg-background px-10">
      <div className="flex items-center gap-10">
        <MobileMenuButton />
        <p className="text-nowrap">Book-Journey Logo</p>
        <HeaderNavLinks />
      </div>
      <BookSearchArea />
      <div className="flex items-center sm:gap-4 lg:gap-10">
        <UserLoginStatus />
        <ThemeModeToggle />
      </div>
    </header>
  );
}

function MobileHeader() {
  return (
    <header className="fixed flex h-12 w-full items-center justify-between border bg-background px-1">
      <div className="flex w-16 items-center">
        <MobileMenuButton />
      </div>
      <div className="flex flex-1 items-center gap-4">
        <Link href="/">홈</Link>
        <BookSearchArea />
      </div>
      <div className="flex items-center gap-2">
        <UserLoginStatus />
        <ThemeModeToggle />
      </div>
    </header>
  );
}
