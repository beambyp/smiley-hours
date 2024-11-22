"use client"

import Image from "next/image";
import SignInForm from "../ui/signin/signinform"

export default function Page() {
    return (
        <div className="bg-gray-100">
            <div className="bg-white flex w-screen h-screen">
                <div className="md:w-1/2 w-full h-full relative">
                    <div className="text-center">
                        <Image
                        src="/signin/login.png"
                        width={1000}
                        height={760}
                        className=""
                        alt=""
                        />
                    </div>
                </div>
                <div className="md:w-1/2 w-full p-16 md:p-8 grid grid-col content-center">
                    <SignInForm/>
                </div>
            </div>
        </div>
    );
};