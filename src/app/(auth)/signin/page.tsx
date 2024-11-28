'use client';

import Link from "next/link";
import { UserAuthFormSignIn } from "@/app/(auth)/components/user-auth-form-signin";
import Image from "next/image";


export default function SignInPage() {
  return (
    <>
      <div className=" h-screen container absolute top-0 hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center mt-2">
              <h1 className="text-2xl font-semibold tracking-tight ">
                Masuk ke Akun Anda
              </h1>
              <p className="text-sm text-muted-foreground">
                Lengkapi data di bawah untuk masuk ke akun Anda
              </p>
            </div>
            <UserAuthFormSignIn />
          </div>
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          {/* image full width and height */}
          <Image src="/signin.jpg" layout="fill" objectFit="cover"  alt="Sign in image" />
          <div className="absolute inset-0" />
        </div>
      </div>
    </>
  );
}
