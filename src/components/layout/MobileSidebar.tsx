'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import MenuIcon from '../icons/MenuIcon'
import { SidebarMenuContent } from './Sidebar'

export default function MobileSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  // pathname 변경 시 사이드바를 닫는다 (렌더 중 비교 — React 권장 패턴)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    if (open) setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 lg:hidden">
        <SidebarMenuContent />
      </SheetContent>
    </Sheet>
  )
}
