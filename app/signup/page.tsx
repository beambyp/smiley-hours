"use client"

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
                <div className="md:w-1/2 w-screen p-16 md:p-8 grid grid-col content-around">
                    <div className="max-h-screen">
                    {!selectedRole ? (
                    <SelectRole onSelect={handleRoleSelect} />
                    ) : selectedRole === 'patient' ? (
                        <UserForm />
                    ) : (
                        <PsychologistForm />
                    )}
                    </div>
                </div>
        </div>
    );
};