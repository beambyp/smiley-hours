"use client";

import { useState, useEffect, } from "react";
import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import Card from "../ui/component/card";
import Modal from "../ui/component/modal";
import { useSession } from "next-auth/react";

type CardData = {
  title: string;
  image: string;
  categories: string;
  specialization: string;
  gender: string;
  workplace: string;
  licensenumber: string;
};

export default function Page() {
  const { data: session, status } = useSession();

  let menuItems = [];
  if (status === "authenticated" && session?.user) {
    menuItems = [
      { href: "/home", label: "หน้าหลัก" },
      { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
      { href: "/appointmentrecord", label: "นัดหมาย" },
      { href: "/medicalrecord", label: "ประวัติการรักษา" },
      { href: "/article", label: "บทความ" },
    ];
  } else {
    menuItems = [
      { href: "/home", label: "หน้าหลัก" },
      { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
      { href: "/selfAssessment", label: "แบบประเมินตนเอง" },
      { href: "/article", label: "บทความ" },
    ];
  }

  const [cardData, setCardData] = useState<CardData[]>([]);
  const [filter, setFilter] = useState<string>("ทั้งหมด");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  useEffect(() => {
    async function fetchPsychologists() {
      try {
        const response = await fetch("/api/showpsychologist");
        const data = await response.json();
        if (Array.isArray(data)) {
          const mappedData: CardData[] = data.map((psychologist) => ({
            title: `${psychologist.name} ${psychologist.surname}`,
            image: psychologist.psychologistPhoto || "/doctor/d5.png",
            categories: [
              psychologist.isSpecializeChildAndTeen && "เด็กและวัยรุ่น",
              psychologist.isSpecializeAdult && "ผู้ใหญ่",
              psychologist.isSpecializeElder && "ผู้สูงอายุ",
            ].filter(Boolean).join(" "),
            specialization: psychologist.specialization,
            gender: psychologist.gender,
            workplace: psychologist.workplace,
            licensenumber: psychologist.licenseNumber,
          }));
          setCardData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching psychologist data:", error);
      }
    }
    fetchPsychologists();
  }, []);

  const filteredData =
    filter === "ทั้งหมด"
      ? cardData
      : cardData.filter((card) => card.categories.includes(filter));

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div>
      <TopHeader />
      <Navbar menuItems={menuItems} />
      <ImageSlider1 />
      <main className="container bg-foreground mx-auto py-10 shadow-2xl">
        <header className="text-center py-10">
          <h1 className="font-akshar text-5xl text-[#2B6EB0]">Smiley Hours</h1>
          <p className="font-anuphan text-[#60AAF9] text-xl mt-4">
            มีนักจิตวิทยาพร้อมให้คำปรึกษามากมาย พร้อมรับฟัง
          </p>
          <p className="font-anuphan text-[#60AAF9] text-xl mt-4">
            เเละเข้าใจทุกปัญหา ของทุกคน เลือกนักจิตวิทยาที่ต้องการ เพื่อดูแลหัวใจ
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
            ทั้งหมด
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${filter === "เด็กและวัยรุ่น"
              ? "bg-[#378CDE] text-white"
              : "bg-blue-100 text-blue-500"
              }`}
            onClick={() => setFilter("เด็กและวัยรุ่น")}
          >
            เด็กและวัยรุ่น
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${filter === "ผู้ใหญ่"
              ? "bg-[#378CDE] text-white"
              : "bg-blue-100 text-blue-500"
              }`}
            onClick={() => setFilter("ผู้ใหญ่")}
          >
            ผู้ใหญ่
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${filter === "ผู้สูงอายุ"
              ? "bg-[#378CDE] text-white"
              : "bg-blue-100 text-blue-500"
              }`}
            onClick={() => setFilter("ผู้สูงอายุ")}
          >
            ผู้สูงอายุ
          </button>
        </div>

        <div className="flex justify-center items-center py-4">
          <div className="grid md:grid-cols-3 gap-x-20 gap-y-20">
            {filteredData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                subtitle={`นักจิตวิทยา ${card.categories}`}
                image={card.image}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={selectedCard?.title || ""}
          image={selectedCard?.image || "/doctor/d5.png"}
          categories={selectedCard?.categories || ""}
          specialization={selectedCard?.specialization || ""}
          gender={selectedCard?.gender || ""}
          workplace={selectedCard?.workplace || ""}
          licensenumber={selectedCard?.licensenumber || ""}
        />
      </main>
      <Footer />
    </div>
  );
}
