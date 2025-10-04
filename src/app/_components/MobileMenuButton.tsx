"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarMenu from "./SidebarMenu";
import { Button } from "@/components/ui/button";
import MenuIcon from "./icons/MenuIcon";
import { useState } from "react";

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
