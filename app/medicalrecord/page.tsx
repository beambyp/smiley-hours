"use client"
import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import MedicalRecordBox from "../ui/medicalrecord/medicalrecordbox";

type MedicalData = {
  Name: string,
  symptom: string,
  diagnosis: string,
  advice: string,
  treatmentDate: string,
  treatmentStartTime: string,
  treatmentEndTime: string,
};

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status != "authenticated") {
    router.push("/signin")
  }
  const user = session?.user?.email;
  const role = session?.user?.Role
  {/* Navbar */ }
  let menuItems = [];
  if (session?.user.Role == "User") {
    menuItems = [
      { href: "/home", label: "หน้าหลัก" },
      { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
      { href: "/appointmentrecord", label: "นัดหมาย" },
      { href: "/medicalrecord", label: "ประวัติการรักษา" },
      { href: "/article", label: "บทความ" },
    ];
  }
  else {
    menuItems = [
      { href: "/home", label: "หน้าหลัก" },
      { href: "/schedule", label: "ตารางงาน" },
      { href: "/appointmentrecord", label: "นัดหมาย" },
      { href: "/result", label: "ผลวินิจฉัย" },
      { href: "/medicalrecord", label: "ประวัติการรักษา" },
    ];
  }

  const [recordData, setRecordData] = useState<MedicalData[]>([]);
  const [filter, setFilter] = useState<string>("ทั้งหมด");

  useEffect(() => {
    async function fetchAppointmentRecord() {
      try {
        if (!user) {
          console.error("Cannot parse the email from the session");
          return;
        }

        // Configure the API path based on the role
        const baseApi = "/api/medicalrecord";
        let apiPath = "";
        if (role == "User") {
          apiPath = `${baseApi}/user?user=${encodeURIComponent(user)}`
        }
        else {
          apiPath = `${baseApi}/psychologist?user=${encodeURIComponent(user)}`
        }

        const response = await fetch(apiPath, {
          method: "GET",
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          const mappedData: MedicalData[] = data.map((record) => ({
            Name: record.Name,
            symptom: record.symptom,
            diagnosis: record.diagnosis,
            advice: record.advice,
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
    fetchAppointmentRecord();
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
            ประวัติการดูแลหัวใจ ให้เราได้ใกล้กัน
          </p>
        </header>
        <div className="flex space-x-4 mb-8 ml-16">
          <button
            className={`px-6 py-2 rounded-lg ${filter === "ทั้งหมด"
              ? "bg-[#378CDE] text-white"
              : "bg-blue-100 text-blue-500"
              }`}
            onClick={() => setFilter("ทั้งหมด")}
          >
            การรักษาทั้งหมด
          </button>
        </div>

        <div className="px-16">
          {recordData.map((data, index) => (
            <MedicalRecordBox
              key={index}
              Name={data.Name}
              symptom={data.symptom}
              diagnosis={data.diagnosis}
              advice={data.advice}
              treatmentDate={data.treatmentDate}
              treatmentStartTime={data.treatmentStartTime}
              treatmentEndTime={data.treatmentEndTime}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
