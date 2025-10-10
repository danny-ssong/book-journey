"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import MenuIcon from "../../components/icons/MenuIcon";
import SidebarMenu from "./SidebarMenu";

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 lg:hidden">
        <SidebarMenu />
      </SheetContent>
    </Sheet>
  );
}
