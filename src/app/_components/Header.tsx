"use client";

import HeaderNavLinks from "./HeaderNavLinks";
import BookSearchArea from "./MainBookSearchInput";
import UserLoginStatus from "./UserLoginStatus";
import ThemeModeToggle from "./ThemeModeToggle";
import MobileMenuButton from "./MobileMenuButton";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  return isDesktopOrLaptop ? <DesktopHeader /> : <MobileHeader />;
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
      <div className="flex items-center gap-6">
        <UserLoginStatus />
        <ThemeModeToggle />
      </div>
    </header>
  );
}

function MobileHeader() {
  return (
    <header className="fixed flex h-12 w-full items-center justify-between border bg-background px-1">
      <div className="flex items-center">
        <MobileMenuButton />
      </div>
      <BookSearchArea />
      <div className="flex items-center gap-6">
        <UserLoginStatus />
        <ThemeModeToggle />
      </div>
    </header>
  );
}
