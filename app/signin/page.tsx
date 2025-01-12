"use client";

import Image from "next/image";
import SignInForm from "../ui/signin/signinform";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-white">
            {/* Left Section: Image */}
            <div className="relative w-full md:w-1/2 h-1/3 md:h-full">
                <Image
                    src="/signin/logo.png"
                    alt="Login Background"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Right Section: SignInForm */}
            <div className="flex w-full md:w-1/2 p-8 md:p-16 items-center justify-center">
                <SignInForm />
            </div>
        </div>
    );
}
