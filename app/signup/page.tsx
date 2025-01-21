"use client";

import Image from "next/image";
import UserForm from "../ui/signup/userform";
import SelectRole from "../ui/signup/selectrole";
import PsychologistForm from "../ui/signup/psychologistform";
import { useState } from "react";

export default function Page() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen">
            {/* Left Section: Image */}
            <div className="relative w-full md:w-1/2 h-1/3 md:h-full">
                <Image
                    src="/signin/logo.png"
                    alt="Login Background"
                    fill
                    className="object-cover h-full w-full"
                    priority
                />
            </div>

            {/* Right Section: Form */}
            <div className="flex w-full md:w-1/2 h-full bg-white p-8 items-center justify-center overflow-auto">
                <div className="max-w-lg w-full space-y-6">
                    {/* Render Form Based on Selected Role */}
                    {!selectedRole ? (
                        <SelectRole onSelect={handleRoleSelect} />
                    ) : selectedRole === "patient" ? (
                        <UserForm />
                    ) : (
                        <PsychologistForm />
                    )}
                </div>
            </div>
        </div>
    );
}