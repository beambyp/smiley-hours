import { DateTime } from "next-auth/providers/kakao";
import dayjs from "dayjs";
import CancelModal from "./cancelmodal";
import { useState } from "react";

type AppointmentData = {
    appointmentId: number,
    appointmentDate: DateTime,
    psychologistName: string,
    isCancel: boolean,
};

const RecordBox: React.FC<AppointmentData> = ({ appointmentId, appointmentDate, psychologistName, isCancel }) => {
    const formattedDate = dayjs(appointmentDate).format("D MMMM YYYY");
    const formattedStartTime = dayjs(appointmentDate).format("HH.mm");
    const formattedEndTime = dayjs(appointmentDate).add(1, "hour").format("HH.mm");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const onClickDelete = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false);
    };

    const isAppointmentNow = () => {
        const appointmentDateObj = new Date(appointmentDate);
        const now = new Date();
        return (
            appointmentDateObj.getFullYear() === now.getFullYear() &&
            appointmentDateObj.getMonth() === now.getMonth() &&
            appointmentDateObj.getDate() === now.getDate() &&
            appointmentDateObj.getHours() === now.getHours()
        );
    };

    const onClickChat = () => {
        // Pop up chat 
    }

    if (isCancel == true) {
        return (
            <div className="flex justify-around bg-[#D9D9D9] p-4 rounded-lg shadow-md mb-4 h-14">
                <div className="text-[#3C95EC] font-anuphan">{psychologistName}</div>
                <div className="text-[#3C95EC] font-anuphan">{formattedDate}</div>
                <div className="text-[#3C95EC] font-anuphan">{formattedStartTime} - {formattedEndTime}</div>
            </div>
        );
    }
    else {
        if (isAppointmentNow()) {
            return (
                <div>
                    <div className="text-[#2B6EB0] font-semibold text-xl mb-4">ถึงเวลานัดหมาย</div>
                    <div className="flex justify-around bg-[#60AAF9] p-4 rounded-lg shadow-md mb-20 h-14">
                        <div className="text-white font-anuphan">{psychologistName}</div>
                        <div className="text-white font-anuphan">{formattedDate}</div>
                        <div className="text-white font-anuphan">{formattedStartTime} - {formattedEndTime}</div>
                        <div>
                            <button onClick={onClickChat}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 24 24"><path fill="#00EAA0" d="M6 14h8v-2H6zm0-3h12V9H6zm0-3h12V6H6zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="flex justify-around bg-[#9acafc] p-4 rounded-lg shadow-md mb-4 h-14">
                <div className="text-white font-anuphan">{psychologistName}</div>
                <div className="text-white font-anuphan">{formattedDate}</div>
                <div className="text-white font-anuphan">{formattedStartTime} - {formattedEndTime}</div>
                <div>
                    <button
                        onClick={onClickDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 24 24"><path fill="#C24C67" d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4zM6 6v14h12V6zm3 3h2v8H9zm4 0h2v8h-2z" /></svg>
                    </button>
                </div>

                <CancelModal
                    isOpen={modalOpen}
                    onClose={closeModal}
                    appointmentId={appointmentId}
                />
            </div>
        );
    }
}

export default RecordBox;