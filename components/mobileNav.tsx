/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import ProfileDropdown from "./ProfileDropdown";

export default function MobileNav(){ 
  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <CiMenuBurger />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-purple-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30"
        >
          <nav className="flex flex-col items-center gap-3 text-white">
            <Link href="/">Home</Link>
            <Link href="/">Project</Link>
            <Link href="/">Events</Link>
            <Link href="/events/create">Add Events</Link>
            <ProfileDropdown/>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
