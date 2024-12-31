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
import ChatModal from "../ui/chat/chatmodal";
import dayjs from "dayjs";

type AppointmentData = {
  appointmentId: number,
  appointmentDate: DateTime,
  psychologistName: string,
  isCancel: boolean,
  isSuccess: boolean,
  symptom: string,
};

type AppointmentDataNow = {
  appointmentDate: DateTime,
  Name: string,
};

export default function Page() {
  const { data: session, status } = useSession();
  const user = session?.user.email;
  const role = session?.user.Role;
  const router = useRouter();
  if (status != "authenticated") {
    router.push("/signin")
  }
  {/* Navbar */ }
  let menuItems = [];
  if (role == "User") {
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

  const [recordData, setRecordData] = useState<AppointmentData[]>([]);
  const [filter, setFilter] = useState<string>("ทั้งหมด");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<AppointmentDataNow[]>([]);

  useEffect(() => {
    async function fetchAppointmentRecord() {
      try {
        if (!user) {
          console.error("Cannot parse the email from the session");
          return;
        }

        // Configure the API path based on the role
        const baseApi = "/api/appointmentrecord";
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
          const mappedData: AppointmentData[] = data.map((record) => ({
            appointmentId: record.appointmentId,
            appointmentDate: record.appointmentDate,
            psychologistName: record.psychologistName,
            isCancel: record.isCancel,
            isSuccess: record.isSuccess,
            symptom: record.symptom,
          }));
          setRecordData(mappedData);
          console.log("Fetched appointment record data:", recordData);
        }
      } catch (error) {
        console.error("Error fetching appointment record data:", error);
      }
    }
    fetchAppointmentRecord();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: session?.user.email,
          role: session?.user.Role,
        })
      })
      const data = await response.json();
      if (Array.isArray(data)) {
        const mappedData: AppointmentDataNow[] = data.map((record) => ({
          appointmentDate: record.appointmentDate,
          Name: record.Name,
        }));
        setNotifications(mappedData);
      }
    } catch (error) {
      console.error("Error fetching notification:", error);
    }
  };
  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = (() => {
    switch (filter) {
      case "ทั้งหมด":
        return recordData.filter((card) => card.isCancel === false && card.isSuccess === true);
      case "ยกเลิก":
        return recordData.filter((card) => card.isCancel === true && card.isSuccess === true);
      case "รอรับ":
        return recordData.filter((card) => card.isSuccess === false);
      default:
        return [];
    }
  })();

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const onClickChat = () => {
    openModal();
}

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
          {role == "Psychologist" && <div>
            <button
              className={`px-6 py-2 rounded-lg ${filter === ""
                ? "bg-[#378CDE] text-white"
                : "bg-blue-100 text-blue-500"
                }`}
              onClick={() => setFilter("")}
            >
              สร้างการนัดหมาย
            </button>
          </div>}
          <div>
            <button
              className={`px-6 py-2 rounded-lg ${filter === "รอรับ"
                ? "bg-[#378CDE] text-white"
                : "bg-blue-100 text-blue-500"
                }`}
              onClick={() => setFilter("รอรับ")}
            >
              รอรับนัดหมาย
            </button>
          </div>
        </div>

        <div className="px-16">
          {filter == "ทั้งหมด" && notifications.length > 0 && (
            <div>
              <div className="text-[#2B6EB0] font-semibold text-xl mb-4">ถึงเวลานัดหมาย</div>
              {notifications.map((notification, index) => {
                const formattedDate = dayjs(notification.appointmentDate).format("D MMMM YYYY");
                const formattedStartTime = dayjs(notification.appointmentDate).format("HH.mm");
                const formattedEndTime = dayjs(notification.appointmentDate).add(1, "hour").format("HH.mm");

                return (
                  <div key={index} className="flex justify-around bg-[#60AAF9] p-4 rounded-lg shadow-md mb-20 h-14">
                    <div className="text-white font-anuphan">{notification.Name}</div>
                    <div className="text-white font-anuphan">{formattedDate}</div>
                    <div className="text-white font-anuphan">{formattedStartTime} - {formattedEndTime}</div>
                    <div>
                      <button onClick={onClickChat}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 24 24"><path fill="#00EAA0" d="M6 14h8v-2H6zm0-3h12V9H6zm0-3h12V6H6zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z" /></svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {filteredData.map((data, index) => (
            <RecordBox
              key={index}
              appointmentId={data.appointmentId}
              appointmentDate={data.appointmentDate}
              Name={data.psychologistName}
              isCancel={data.isCancel}
              symptom={data.symptom}
              status={filter}
            />
          ))}
        </div>
        <ChatModal
          isOpen={modalOpen}
          onClose={closeModal} />
      </main>
      <Footer />
    </div>
  );
}
