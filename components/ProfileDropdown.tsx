"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { defaultState } from "@/redux/features/user/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sessionProps } from "@/types/globalTypes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ProfileDropdown({
  session
}: {
  session: sessionProps | null;
}) {
  const email = useAppSelector((state) => state.auth.user.email);
  const sessionEmail = session?.user?.email;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    dispatch(defaultState());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    toast.success("Successfully logged out!");
    router.push("/");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none">
            <FaRegUserCircle />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-center mx-auto">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {email || sessionEmail ? (
            <>
              <DropdownMenuItem className="w-full">
                <button
                  className="block w-full text-center"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full">
                <Link href="/profile" className="block w-full text-center">
                  Profile
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem className="w-full">
                <Link href="/login" className="block w-full text-center">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full">
                <Link href="/signUp" className="block w-full text-center">
                  Sign Up
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
