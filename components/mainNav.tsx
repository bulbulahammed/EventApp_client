"use client";

import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";

export default function MainNav() {
  const email = useAppSelector((state) => state.auth.user.email);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="hidden md:flex text-white">
      <nav className="flex items-center gap-3 mr-8 lg:gap-4">
        <Link href="/">Home</Link>
        <Link href="/">Project</Link>
        <Link href="/">Events</Link>
        {isLoaded && email && <Link href="/events/create">Create Event</Link>}
        <ProfileDropdown />
      </nav>
    </div>
  );
}
