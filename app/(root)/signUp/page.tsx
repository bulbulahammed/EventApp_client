/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSignupUserMutation } from "../../../redux/features/user/userApiSlice";

export default function Signup() {
  const router = useRouter();
  const [signupUser, { data, isLoading, isSuccess, isError }] =
    useSignupUserMutation();

  const [formData, setFormData] = useState({
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  });

  // Use useEffect to handle side effects
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message, { toastId: "SignUpSuccess" });
      router.push("/login");
    } else if (isError) {
      toast.error("Sign Up Failed!", { toastId: "SignUpError" });
    }
  }, [isSuccess, isError, data, router]); // Dependency array includes all variables used in useEffect

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData.user;
    // Basic client-side validation
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required!", { toastId: "SignUpError" });
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Invalid email format!", { toastId: "EmailError" });
      return;
    }
    signupUser(formData);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center bg-no-repeat bg-center bg-cover bg-[url('/assets/images/bg-image.jpg')]">
        <div className="max-w-[500px] h-auto py-10 my-20 px-12 bg-white-500 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-[2px] border-[rgba(255,255,255,0.61)]">
          {/* Heading */}
          <div className="w-full h-auto">
            <h1 className="text-[1.475rem] text-white font-semibold mb-1">
              Sign Up
            </h1>
            <p className="text-sm text-gray-300 font-normal mb-8">
              Welcome To EventApp!
            </p>
          </div>
          {/* Devider */}
          <div className="w-full h-auto flex items-center gap-x-1 my-5">
            <div className="w-1/2 h-[1.5px] bg-gray-200/40 rounded-md"></div>
            <p className="text-sm text-gray-300 font-normal px-2">OR</p>
            <div className="w-1/2 h-[1.5px] bg-gray-200/40 rounded-md"></div>
          </div>
          {/* Form  */}
          <form onSubmit={handleSubmit}>
            {/* First Name and Last Name */}
            <div className="w-full h-auto flex gap-7 justify-center">
              {/* First Name Input */}
              <div className="w-1/2">
                <label className="label">
                  <span className="text-white text-sm">First Name</span>
                </label>
                <input
                  type="text"
                  className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                  name="firstName"
                  value={formData.user.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              {/* Last Name Input */}
              <div className="w-1/2">
                <label className="label">
                  <span className="text-white text-sm">Last Name</span>
                </label>
                <input
                  type="text"
                  className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                  name="lastName"
                  value={formData.user.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/*----------- Label For Email ------------*/}
            <div className="mb-4">
              <label className="label">
                <span className="text-white text-sm">Email</span>
              </label>
              <input
                type="email"
                id="username"
                className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                name="email"
                value={formData.user.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
            </div>
            {/*----------- Label For Password ------------*/}
            <div className="mt-4">
              <label className="label">
                <span className="text-sm text-white">Password</span>
              </label>
              <input
                type="password"
                className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                name="password"
                value={formData.user.password}
                onChange={handleChange}
                placeholder="examplePassword123"
              />
            </div>
            {/* Remember and Forgot Password */}
            <div className="w-full h-auto flex item-center justify-between my-5">
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-gray-200/20 border-gray-200/20 rounded-md text-white"
                />
                <label htmlFor="remember" className="text-[0.87rem] text-white">
                  Remember Me
                </label>
              </div>
              <div className="w-auto h-auto">
                <Link
                  href="/"
                  className="text-white text-sm font-medium hover:underline ease-out duration-500"
                >
                  Forgot Password
                </Link>
              </div>
            </div>
            {/* Submit Button */}
            {isLoading ? (
              <Button className="w-full h-12 outline-none bg-purple-600 rounded-md text-lg text-white font-medium mb-7">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-12 outline-none bg-white/70 rounded-md text-lg text-black font-medium mb-7 hover:bg-white ease-out duration-500"
              >
                Sign In
              </Button>
            )}
            <div className="w-full h-auto flex items-center justify-between gap-x-1">
              <p className="text-white text-xs font-thin">
                Already have an account?
              </p>
              <Link
                href="/login"
                className="text-white text-xs font-thin hover:underline ease-out duration-500"
              >
                Sign in.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
