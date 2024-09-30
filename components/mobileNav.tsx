/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { defaultState } from "@/redux/features/user/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sessionProps } from "@/types/globalTypes";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { toast } from "react-toastify";
import ProfileDropdown from "./ProfileDropdown";

export default function MobileNav({
  session
}: {
  session: sessionProps | null;
}) {
  const email = useAppSelector((state) => state.auth.user.email);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(defaultState());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    toast.success("Successfully logged out!");
  };
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
            <ProfileDropdown session={session} />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
