"use client";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

export default function MainNav() {
  return (
    <div className="hidden md:flex text-white">
      <nav className="flex items-center gap-3 mr-8 lg:gap-4">
        <Link href="/">Home</Link>
        <Link href="/">Project</Link>
        <Link href="/">Events</Link>
        <Link href="/events/create">Add Events</Link>
        <ProfileDropdown />
      </nav>
    </div>
  );
}
