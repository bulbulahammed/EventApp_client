/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import ProfileDropdown from "./ProfileDropdown";

export default function MobileNav() {
  const email = useAppSelector((state) => state.auth.user.email);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
            <Link href="/events">Events</Link>
            {isLoaded && email && (
              <Link href="/events/create">Create Event</Link>
            )}
            <ProfileDropdown />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
