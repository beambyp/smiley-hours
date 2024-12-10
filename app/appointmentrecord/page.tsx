"use client"
import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { DateTime } from "next-auth/providers/kakao";
import RecordBox from "../ui/appointmentrecord/recordbox";

type AppointmentData = {
  appointmentId: number,
  appointmentDate: DateTime,
  psychologistName: string,
  isCancel: boolean,
};

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status != "authenticated") {
    router.push("/signin")
  }
  {/* Navbar */ }
  const menuItems = [
    { href: "/home", label: "หน้าหลัก" },
    { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
    { href: "/appointmentrecord", label: "นัดหมาย" },
    { href: "/main", label: "ประวัติการรักษา" },
    { href: "/article", label: "บทความ" },
  ];

  const [recordData, setRecordData] = useState<AppointmentData[]>([]);
  const [filter, setFilter] = useState<string>("ทั้งหมด");

  useEffect(() => {
    async function fetchAppointmentRecord() {
      try {
        const user = session?.user?.email;
        if (!user) {
          console.error("Cannot parse the email from the session");
          return;
        }
        const response = await fetch(`/api/appointmentrecord?user=${encodeURIComponent(user)}`, {
          method: "GET",
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          const mappedData: AppointmentData[] = data.map((record) => ({
            appointmentId: record.appointmentId,
            appointmentDate: record.appointmentDate,
            psychologistName: record.psychologistName,
            isCancel: record.isCancel,
          }));
          setRecordData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching appointment record data:", error);
      }
    }
    fetchAppointmentRecord();
  },[]);

  const filteredData =
    filter === "ทั้งหมด"
      ? recordData.filter((card) => card.isCancel == false)
      : recordData.filter((card) => card.isCancel == true)

  return (
    <div>
      <TopHeader />
      <Navbar menuItems={menuItems} />
      <ImageSlider1 />
      <main className="container bg-foreground mx-auto py-10 shadow-2xl">
        <header className="text-center py-10">
          <h1 className="font-akshar text-5xl text-[#2B6EB0]">Smiley Hours</h1>
          <p className="font-anuphan text-[#60AAF9] text-xl mt-4">
            รายการนัดหมายของฉัน
          </p>
        </header>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-lg ${filter === "ทั้งหมด"
              ? "bg-[#378CDE] text-white"
              : "bg-blue-100 text-blue-500"
              }`}
            onClick={() => setFilter("ทั้งหมด")}
          >
            นัดหมายทั้งหมด
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${filter === "ยกเลิก"
              ? "bg-[#378CDE] text-white"
              : "bg-blue-100 text-blue-500"
              }`}
            onClick={() => setFilter("ยกเลิก")}
          >
            ยกเลิกนัดหมาย
          </button>
        </div>

        <div className="px-16">
          {filteredData.map((data,index) => (
            <RecordBox
              key={index}
              appointmentId={data.appointmentId}
              appointmentDate={data.appointmentDate}
              psychologistName={data.psychologistName}
              isCancel={data.isCancel}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
