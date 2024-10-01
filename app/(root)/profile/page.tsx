"use client";
import { useAppSelector } from "@/redux/hooks";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import profileBG from "../../../public/assets/images/profile-bg.jpg";
import userAvatar from "../../../public/assets/images/user-placeholder.jpg";

export default function Profile() {
  const [session, setSession] = useState<Session | null>(null);
  const email = useAppSelector((state) => state.auth.user.email);

  useEffect(() => {
    async function fetchSession() {
      const userSession = await getSession();
      setSession(userSession);
    }
    fetchSession();
  }, []);

  const sessionEmail = session?.user?.email;
  const avatarUrl = session?.user?.image || userAvatar;

  return email || sessionEmail ? (
    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <Image
          className="object-cover object-top w-full"
          src={profileBG}
          width={500}
          height={500}
          alt="Profile Background"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <Image
          className="object-cover object-center h-32"
          src={avatarUrl}
          width={500}
          height={500}
          alt="User avatar"
        />
      </div>
      <div className="text-center mt-2 pb-40">
        <h2 className="font-semibold">{session?.user?.name}</h2>
        <p className="text-gray-500">{session?.user?.email ?? email}</p>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Please Login or signup.
        </h1>
        <p className="mt-4 text-gray-600">
          Login or Create an account to access your personalized profile.
        </p>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
