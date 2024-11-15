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
        <div className="bg-gray-100">
            <div className="bg-white flex w-screen h-screen">
                <div className="md:w-1/2 w-full h-full relative">
                    <div className="text-center">
                        <Image
                        src="/login/login.png"
                        width={1000}
                        height={760}
                        className=""
                        alt=""
                        />
                    </div>
                </div>
                <div className="md:w-1/2 w-full p-16 md:p-8 grid grid-col content-center">
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