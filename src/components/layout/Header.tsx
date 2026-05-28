import Link from 'next/link'

import BookSearchArea from './MainBookSearchBar'
import MobileSidebar from './MobileSidebar'
import ThemeModeToggle from './ThemeModeToggle'
import UserLoginStatus from './UserLoginStatus'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-12 w-full items-center border-b bg-background lg:h-16" aria-label="헤더">
      {/* 배경/보더는 화면 전체 폭, 콘텐츠는 본문과 동일한 max-w-layout 컨테이너로 정렬 */}
      <div className="mx-auto flex w-full max-w-layout items-center px-4">
        {/* 좌측: 모바일은 햄버거 + 홈, 데스크톱은 로고 */}
        <div className="flex flex-1 items-center gap-4 lg:gap-10">
          <div className="lg:hidden">
            <MobileSidebar />
          </div>
          <Link href="/" className="text-nowrap">
            <span className="lg:hidden">홈</span>
            <span className="hidden lg:inline">Book-Journey</span>
          </Link>
        </div>

        <BookSearchArea />

        <div className="flex flex-1 items-center justify-end gap-2 lg:gap-10">
          <UserLoginStatus />
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  )
}
