"use client"
import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import ResultRecordBox from "../ui/result/resultrecordbox";

type RecordData = {
    AppointmentID: number,
    Name: string,
    symptom: string,
    treatmentDate: string,
    treatmentStartTime: string,
    treatmentEndTime: string,
};

export default function Page() {
    const { data: session, status } = useSession();
    const [recordData, setRecordData] = useState<RecordData[]>([]);
    const router = useRouter();
    if (status != "authenticated") {
        router.push("/signin")
    }
    if (session?.user.Role != "Psychologist") {
        router.push("/signin")
    }
    const user = session?.user.email;
    {/* Navbar */ }
    const menuItems = [
        { href: "/home", label: "หน้าหลัก" },
        { href: "/scheduleD", label: "ตารางงาน" },
        { href: "/appointmentrecord", label: "นัดหมาย" },
        { href: "/result", label: "ผลวินิจฉัย" },
        { href: "/medicalrecord", label: "ประวัติการรักษา" },
    ];

    useEffect(() => {
        async function fetchAppointmentForDiagnosisRecord() {
            try {
                if (!user) {
                    console.error("Cannot parse the email from the session");
                    return;
                }
                const response = await fetch(`/api/result?user=${encodeURIComponent(user)}`, {
                    method: "GET",
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    const mappedData: RecordData[] = data.map((record) => ({
                        AppointmentID: record.AppointmentID,
                        Name: record.Name,
                        symptom: record.symptom,
                        treatmentDate: record.treatmentDate,
                        treatmentStartTime: record.treatmentStartTime,
                        treatmentEndTime: record.treatmentEndTime
                    }));
                    setRecordData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching appointment record data:", error);
            }
        }
        fetchAppointmentForDiagnosisRecord();
    }, []);

    return (
        <div>
            <TopHeader />
            <Navbar menuItems={menuItems} />
            <ImageSlider1 />
            <main className="container bg-foreground mx-auto py-10 shadow-2xl">
                <header className="text-center py-10">
                    <h1 className="font-akshar text-5xl text-[#2B6EB0]">Smiley Hours</h1>
                    <p className="font-anuphan text-[#60AAF9] text-xl mt-4">
                        วินิจฉัยอาการติดตามสุขภาพหัวใจ
                    </p>
                </header>

                {recordData.length !== 0 ? (
                    <div className="px-16">
                        {recordData.map((data, index) => (
                            <ResultRecordBox
                                key={index}
                                AppointmentID={data.AppointmentID}
                                Name={data.Name}
                                symptom={data.symptom}
                                treatmentDate={data.treatmentDate}
                                treatmentStartTime={data.treatmentStartTime}
                                treatmentEndTime={data.treatmentEndTime}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="px-16">
                        <div className="flex justify-around bg-[#60AAF9] p-4 rounded-lg shadow-md mb-4 h-14">
                            <p className="text-white font-bold">ดูผลวินิจฉัยได้ที่ประวัติการรักษา</p>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
