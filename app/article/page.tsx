"use client";

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import Card from "../ui/component/card";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  {/* Navbar */}
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

  {/* Card */}
  const cardData = [
    {
      title: "โรคทางใจ",
      subtitle: "ของคนวัยทำงาน",
      image: "/article/photo/a1.png",
      description: "พญ. ธรรมาภรณ์ บุญวิสุทธ",
      pdfUrl: "/article/pdf/a1.pdf",
    },
    {
      title: "พื้นที่ปลอดภัย",
      subtitle: "ของใจ ในที่ทำงาน",
      image: "/article/photo/a2.png",
      description: "ภูษณิศา ยังอยู่",
      pdfUrl: "/article/pdf/a2.pdf",
    },
    {
      title: "Social support",
      subtitle: "ทำอย่างไรให้สังคมที่ทำงานน่าอยู่",
      image: "/article/photo/a3.png",
      description: "อภิชญา พลเยี่ยม",
      pdfUrl: "/article/pdf/a3.pdf",
    },
    {
      title: "รักอย่างไร",
      subtitle: "ไม่ให้ หมดโปร",
      image: "/article/photo/a4.png",
      description: "พญ.วนัทดา ถมค้าพาณิชย",
      pdfUrl: "/article/pdf/a4.pdf",
    },
    {
      title: "อยากรัก ต่างวัย",
      subtitle: "ต้องรู้อะไรบ้าง",
      image: "/article/photo/a5.png",
      description: "วาทมอน แก้วสมสอน",
      pdfUrl: "/article/pdf/a5.pdf",
    },
    {
      title: "Q&A ถูกแฟนทำร้าย",
      subtitle: "ควรทำอย่างไร",
      image: "/article/photo/a6.png",
      description: "พญ. ณัชศศิสม อรุณรัตนพงศ",
      pdfUrl: "/article/pdf/a6.pdf",
    },
  ];

  return (
    <div>
      <TopHeader />
      <Navbar menuItems={menuItems} /> 
      <ImageSlider1 />
      <main className="container bg-foreground flex justify-center items-center mx-auto py-20 shadow-2xl">
        <div className="grid md:grid-cols-3 gap-x-20 gap-y-20">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              image={card.image}
              description={card.description}
              pdfUrl={card.pdfUrl}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
