import { useState } from "react";
import MedicalModal from "./medicalrecordmodal";

type MedicalData = {
    Name: string,
    symptom: string,
    diagnosis: string,
    advice: string,
    treatmentDate: string,
    treatmentStartTime: string,
    treatmentEndTime: string,
};

const MedicalRecordBox: React.FC<MedicalData> = ({ Name, symptom, diagnosis, advice, treatmentDate, treatmentStartTime, treatmentEndTime }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const onClickDetail = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <div className="flex justify-around bg-[#9acafc] p-4 rounded-lg shadow-md mb-4 h-14">
            <div className="text-white font-anuphan">{Name}</div>
            <div className="text-white font-anuphan">{treatmentDate}</div>
            <div className="text-white font-anuphan">{treatmentStartTime} - {treatmentEndTime}</div>
            <div>
                <button
                    onClick={onClickDetail}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 24 24"><path fill="#FFFFFF" d="m12.2 13l-.9.9q-.275.275-.275.7t.275.7t.7.275t.7-.275l2.6-2.6q.3-.3.3-.7t-.3-.7l-2.6-2.6q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l.9.9H9q-.425 0-.712.288T8 12t.288.713T9 13zm-.2 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                </button>
            </div>

            <MedicalModal
                isOpen={modalOpen}
                onClose={closeModal}
                Name={Name}
                symptom={symptom}
                diagnosis={diagnosis}
                advice={advice}
                treatmentDate={treatmentDate}
                treatmentStartTime={treatmentStartTime}
                treatmentEndTime={treatmentEndTime}
            />
        </div>
    );
}
export default MedicalRecordBox;