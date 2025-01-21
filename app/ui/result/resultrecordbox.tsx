import { useState } from "react";
import ResultModal from "./resultmodal";

type MedicalData = {
    AppointmentID: number,
    Name: string,
    symptom: string,
    treatmentDate: string,
    treatmentStartTime: string,
    treatmentEndTime: string,
};

const ResultRecordBox: React.FC<MedicalData> = ({ AppointmentID,Name, symptom,treatmentDate, treatmentStartTime, treatmentEndTime }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const onClickDetail = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <div className="flex justify-around bg-[#9acafc] p-4 rounded-lg shadow-md mb-4 h-14">
            <div className="text-white font-anuphan w-1/4">{Name}</div>
            <div className="text-white font-anuphan">{treatmentDate}</div>
            <div className="text-white font-anuphan">{treatmentStartTime} - {treatmentEndTime}</div>
            <div>
                <button
                    onClick={onClickDetail}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M11 11v2q0 .425.288.713T12 14t.713-.288T13 13v-2h2q.425 0 .713-.288T16 10t-.288-.712T15 9h-2V7q0-.425-.288-.712T12 6t-.712.288T11 7v2H9q-.425 0-.712.288T8 10t.288.713T9 11zm-5 7l-2.3 2.3q-.475.475-1.088.213T2 19.575V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-.85-2H20V4H4v13.125zM4 16V4z"/></svg>
                </button>
            </div>

            <ResultModal
                isOpen={modalOpen}
                onClose={closeModal}
                AppointmentID={AppointmentID}
                Name={Name}
                symptom={symptom}
                treatmentDate={treatmentDate}
                treatmentStartTime={treatmentStartTime}
                treatmentEndTime={treatmentEndTime}
            />
        </div>
    );
}
export default ResultRecordBox;