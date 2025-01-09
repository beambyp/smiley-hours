import { DateTime } from "next-auth/providers/kakao";
import dayjs from "dayjs";
import CancelModal from "./cancelmodal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import RecordModal from "./recordmodal";
import { useRouter } from "next/navigation";

type AppointmentData = {
    appointmentId: number,
    appointmentDate: DateTime,
    Name: string,
    isCancel: boolean,
    symptom: string,
    status: string,
};

const RecordBox: React.FC<AppointmentData> = ({ appointmentId, appointmentDate, Name, isCancel, symptom, status}) => {
    const { data: session } = useSession();
    const role = session?.user?.Role
    const router = useRouter(); 
    const formattedDate = dayjs(appointmentDate).format("D MMMM YYYY");
    const formattedStartTime = dayjs(appointmentDate).format("HH.mm");
    const formattedEndTime = dayjs(appointmentDate).add(1, "hour").format("HH.mm");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleDisplayButton = () => {
        if (role == "User") {
            if (status == "รอรับ") {
                return (
                    <div>
                        <button onClick={onClickHandleConsentForm} className="text-red-500 font-semibold text-l font-akshar">
                            Consent Form
                        </button>
                    </div>
                );
            }
            return (
                <div>
                    <button onClick={onClickButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 24 24"><path fill="#C24C67" d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4zM6 6v14h12V6zm3 3h2v8H9zm4 0h2v8h-2z" /></svg>
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={onClickButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 24 24"><path fill="#FFFFFF" d="m11 12.2l-.9-.9q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.6 2.6q.3.3.7.3t.7-.3l2.6-2.6q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275l-.9.9V9q0-.425-.288-.712T12 8t-.712.288T11 9zm1 9.8q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
                    </button>
                </div>
            );
        }
    }

    const onClickHandleConsentForm = () => {
        const appointmentData = {
            appointmentId,
            appointmentDate: appointmentDate.toString(),
            Name,
            isCancel,
            symptom,
            status,
        };
        console.log("appointmentData before storing:", appointmentData);
        localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
        router.push('/processAppointment');
    }

    const onClickButton = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false);
    };

    if (status == "ยกเลิก" || isCancel) {
        return (
            <div className="flex justify-around bg-[#D9D9D9] p-4 rounded-lg shadow-md mb-4 h-14">
                <div className="text-[#3C95EC] font-anuphan">{Name}</div>
                <div className="text-[#3C95EC] font-anuphan">{formattedDate}</div>
                <div className="text-[#3C95EC] font-anuphan">{formattedStartTime} - {formattedEndTime}</div>
            </div>
        );
    }
    return (
            <div className="flex justify-around bg-[#9acafc] p-4 rounded-lg shadow-md mb-4 h-14">
                <div className="text-white font-anuphan">{Name}</div>
                <div className="text-white font-anuphan">{formattedDate}</div>
                <div className="text-white font-anuphan">{formattedStartTime} - {formattedEndTime}</div>
                <div>
                    {handleDisplayButton()}
                </div>

                {role === "User" && (
                    <CancelModal
                        isOpen={modalOpen}
                        onClose={closeModal}
                        appointmentId={appointmentId}
                    />
                )}
                {role === "Psychologist" && (
                    <RecordModal
                        isOpen={modalOpen}
                        onClose={closeModal}
                        Name={Name}
                        symptom={symptom}
                        treatmentDate={formattedDate}
                        treatmentStartTime={formattedStartTime}
                        treatmentEndTime={formattedEndTime}
                    />
                )}
            </div>
    );
};

export default RecordBox;