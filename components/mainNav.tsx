"use client";
import { defaultState } from "@/redux/features/user/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sessionProps } from "@/types/globalTypes";
import Link from "next/link";
import { toast } from "react-toastify";
import ProfileDropdown from "./ProfileDropdown";

export default function MainNav({ session }: { session: sessionProps | null }) {
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
    <div className="hidden md:flex text-white">
      <nav className="flex items-center gap-3 mr-8 lg:gap-4">
        <Link href="/">Home</Link>
        <Link href="/">Project</Link>
        <Link href="/">Events</Link>
        <Link href="/events/create">Add Events</Link>
        <ProfileDropdown session={session} />
      </nav>
    </div>
  );
}
