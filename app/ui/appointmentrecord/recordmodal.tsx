"use client"

import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    Name: string,
    symptom: string,
    treatmentDate: string,
    treatmentStartTime: string,
    treatmentEndTime: string
}

const RecordModal: React.FC<ModalProps> = ({ isOpen, onClose, Name, symptom, treatmentDate, treatmentStartTime, treatmentEndTime}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#3074B7] p-8 rounded-lg shadow-lg w-[28rem] relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#FFFFFF" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                </button>
                <p className="text-white text-xl font-anuphan mb-4 mt-4">ผู้รับคำปรึกษา: {Name}</p>
                <p className="text-white text-xl font-anuphan mb-4">วันที่: {treatmentDate}</p>
                <p className="text-white text-xl font-anuphan mb-4">เวลา: {treatmentStartTime} - {treatmentEndTime}</p>
                <p className="text-white text-xl font-anuphan mb-4 font-bold">อาการเบื้องต้น: </p>
                <p className="text-white text-xl font-anuphan mb-4">{symptom}</p>
            </div>
        </div>
    );
}

export default RecordModal;