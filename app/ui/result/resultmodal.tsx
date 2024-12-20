"use client"

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    AppointmentID: number,
    Name: string,
    symptom: string,
    treatmentDate: string,
    treatmentStartTime: string,
    treatmentEndTime: string
}

const ResultModal: React.FC<ModalProps> = ({ isOpen, onClose, AppointmentID, Name, symptom, treatmentDate, treatmentStartTime, treatmentEndTime }) => {
    const { data: session } = useSession();
    const [diagnosis, setDiagnosis] = useState("");
    const [advice, setAdvice] = useState("");
    const router = useRouter();
    const psychologistemail = session?.user.email

    const handleButton = async () => {
        try {
            const res = await fetch("/api/medicalrecord/psychologist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    AppointmentID, psychologistemail, symptom, diagnosis, advice
                })
            });
            if (res.ok) {
                router.push('/medicalrecord');
            }
            else {
            const errorData = await res.json();
            console.error("Server responded with error:", errorData.error);
        }
    } catch (error) {
        console.error("Client Error:", error);
    }
};
if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-[#3074B7] p-8 rounded-[50px] shadow-lg w-[36rem] relative">
            <button onClick={onClose} className="absolute top-4 right-6 text-xl font-bold text-white mt-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#FFFFFF" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
            </button>
            <p className="text-white text-xl font-anuphan mb-4 mt-4">ผู้รับคำปรึกษา: {Name}</p>
            <p className="text-white text-xl font-anuphan mb-4">วันที่: {treatmentDate}</p>
            <p className="text-white text-xl font-anuphan mb-4">เวลา: {treatmentStartTime} - {treatmentEndTime}</p>
            <p className="text-white text-xl font-anuphan mb-4">อาการเบื้องต้น: </p>
            <p className="text-white text-xl font-anuphan mb-4">{symptom}</p>
            <div>
                <label className="font-anuphan block text-white text-xl mb-4" htmlFor="diagnosis">
                    วินิจฉัย <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="diagnosis"
                    placeholder="วินิจฉัย"
                    className="font-anuphan w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
                    rows={3}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label className="font-anuphan block text-white text-xl mb-4" htmlFor="advice">
                    คำแนะนำ <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="advice"
                    placeholder="คำแนะนำ"
                    className="font-anuphan w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
                    rows={3}
                    onChange={(e) => setAdvice(e.target.value)}
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="font-anuphan w-full bg-white hover:bg-blue-200 text-[#3074B7] py-1.5 rounded-md font-medium transition duration-150"
                onClick={handleButton}
            >
                ยืนยัน
            </button>
        </div>
    </div >
);
}

export default ResultModal;
