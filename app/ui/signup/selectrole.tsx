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
            // Proceed with the next steps, e.g., navigate to the signup form
        } else {
            alert("Please select a role.");
        }
    };
    return (
        <div>
            <div className="flex flex-col items-center">
            <h2 className="text-4xl font-akshar font-bold text-blue-700 mb-6">Select Your Role</h2>
            
            <div className="flex gap-8 mb-6">
                {/* Patient Role Card */}
                <div 
                    className={`flex flex-col items-center border-2 rounded-lg p-6 w-64 cursor-pointer transition-colors 
                        ${selectedRole === 'patient' ? 'border-blue-600' : 'border-gray-300'}`}
                    onClick={() => handleRoleSelect('patient')}
                >
                    <Image
                        src="/login/login.png"
                        width={1000}
                        height={760}
                        className=""
                        alt=""
                    />
                    <p className="font-anuphan text-lg text-gray-800 mt-4">ผู้ต้องการคำปรึกษา</p>
                </div>
                
                {/* Doctor Role Card */}
                <div 
                    className={`flex flex-col items-center border-2 rounded-lg p-6 w-64 cursor-pointer transition-colors 
                        ${selectedRole === 'doctor' ? 'border-blue-600' : 'border-gray-300'}`}
                    onClick={() => handleRoleSelect('doctor')}
                >
                    <Image
                        src="/login/login.png"
                        width={1000}
                        height={760}
                        className=""
                        alt=""
                    />
                    <p className="font-anuphan text-lg text-gray-800 mt-4">ผู้ให้คำปรึกษา</p>
                </div>
            </div>

            <button 
                className="font-akshar bg-blue-600 text-white py-2 px-8 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={handleNext}>
                Next
            </button>
        </div>
        </div>
    );
};