import React, { useState } from 'react';
import Image from 'next/image';

interface SelectRoleProps {
    onSelect: (role: string) => void;
}

export default function SelectRole({ onSelect }: SelectRoleProps) {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    const handleNext = () => {
        if (selectedRole) {
            console.log(`Selected Role: ${selectedRole}`);
            onSelect(selectedRole);  
        } else {
            alert("Please select a role.");
        }
    };

    return (
        <div className="flex flex-col items-center px-4">
            <h2 className="text-2xl md:text-4xl font-akshar font-bold text-[#2B6EB0] mb-6 text-center">
                Select Your Role
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6 w-full md:justify-center">
                {/* Patient Role Card */}
                <div 
                    className={`flex flex-col items-center border-2 rounded-lg p-6 w-full md:w-64 cursor-pointer transition-colors 
                        ${selectedRole === 'patient' ? 'border-[#2B6EB0]' : 'border-gray-300'}`}
                    onClick={() => handleRoleSelect('patient')}
                >
                    <Image
                        src="/signup/usericon.png"
                        width={1000}
                        height={760}
                        className="w-24 h-24 md:w-auto md:h-auto"
                        alt="Patient Role Icon"
                    />
                    <p className="font-anuphan text-base md:text-lg text-[#2B6EB0] mt-4 text-center">
                        ผู้ต้องการคำปรึกษา
                    </p>
                </div>
                
                {/* Doctor Role Card */}
                <div 
                    className={`flex flex-col items-center border-2 rounded-lg p-6 w-full md:w-64 cursor-pointer transition-colors 
                        ${selectedRole === 'doctor' ? 'border-[#2B6EB0]' : 'border-gray-300'}`}
                    onClick={() => handleRoleSelect('doctor')}
                >
                    <Image
                        src="/signup/psychologisticon.png"
                        width={1000}
                        height={760}
                        className="w-24 h-24 md:w-auto md:h-auto"
                        alt="Doctor Role Icon"
                    />
                    <p className="font-anuphan text-base md:text-lg text-[#2B6EB0] mt-4 text-center">
                        ผู้ให้คำปรึกษา
                    </p>
                </div>
            </div>

            <button 
                className="font-akshar bg-[#2B6EB0] text-white py-2 px-6 md:px-8 rounded-md text-base md:text-lg font-medium hover:bg-gray-400 transition-colors"
                onClick={handleNext}>
                Next
            </button>
        </div>
    );
}
