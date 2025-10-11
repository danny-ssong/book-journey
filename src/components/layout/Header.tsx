"use client";

import HeaderNavLinks from "./HeaderNavLinks";
import BookSearchArea from "./MainBookSearchBar";
import ThemeModeToggle from "./ThemeModeToggle";
import UserLoginStatus from "./UserLoginStatus";

export default function Header() {
  return (
    <>
      <DesktopHeader />
      {/* <div className="block sm:hidden">
        <MobileHeader />
      </div> */}
    </>
  );
}

function DesktopHeader() {
  return (
    <header className="fixed flex min-h-16 w-full items-center justify-between border bg-background px-10">
      <div className="flex items-center gap-10">
        <span className="text-nowrap">Book-Journey Logo</span>
        <HeaderNavLinks />
      </div>
      <BookSearchArea />
      <div className="flex items-center gap-10">
        <UserLoginStatus />
        <ThemeModeToggle />
      </div>
    </header>
  );
}

// function MobileHeader() {
//   return (
//     <header className="fixed flex h-12 w-full items-center justify-between border bg-background px-1">
//       <div className="flex w-16 items-center">
//         <MobileMenuButton />
//       </div>
//       <div className="flex flex-1 items-center gap-4">
//         <Link href="/">홈</Link>
//         <BookSearchArea />
//       </div>
//       <div className="flex items-center gap-2">
//         <UserLoginStatus />
//         <ThemeModeToggle />
//       </div>
//     </header>
//   );
// }
