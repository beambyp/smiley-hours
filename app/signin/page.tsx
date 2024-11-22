"use client"

import Image from "next/image";
import SignInForm from "../ui/signin/signinform"

export default function Page() {
    return (
        <div className="bg-white flex w-screen h-screen">
                <div className="md:w-1/2 w-screen relative">
                    <div className="text-center">
                        <Image
                        src="/signin/login.png"
                        alt="Login Background"
                        fill={true}
                        className="object-cover"
                        priority
                        />
                    </div>
                </div>
                <div className="md:w-1/2 w-full p-16 md:p-8 grid grid-col content-center">
                    <SignInForm/>
                </div>
            </div>
    );
};