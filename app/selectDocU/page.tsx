"use client";

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import Card from "../ui/component/card";

export default function Page() {
  {/* Navbar */}
  const menuItems = [
    { href: "/main", label: "หน้าหลัก" },
    { href: "/selectDocU", label: "ผู้ให้คำปรึกษา" },
    { href: "/main", label: "นัดหมาย" },
    { href: "/main", label: "ประวัติการรักษา" },
    { href: "/article", label: "บทความ" },
  ];

  {/* Card */}
  const cardData = [
    {
        title: "ดร. ทศพิธ รุจิระศักดิ์",
        subtitle: "นักจิตวิทยา เด็กและวัยรุ่น ผู้ใหญ่",
        image: "/doctor/d1.png",
    },
    {
        title: "ดร. ธนะกร ตันติเทพ",
        subtitle: "นักจิตวิทยา ผู้ใหญ่",
        image: "/doctor/d2.png",
    },
    {
        title: "ดร. ธนกฤต วิชิตชัย",
        subtitle: "นักจิตวิทยา เด็กและวัยรุ่น",
        image: "/doctor/d3.png",
    },
    {
        title: "ดร. ปริยากร กัมมารังกูร",
        subtitle: "นักจิตวิทยา เด็กและวัยรุ่น ผู้สูงอายุ",
        image: "/doctor/d4.png",
    },
    {
        title: "ดร. ชาลิสา สกุลวิจิตร์สินธุ",
        subtitle: "นักจิตวิทยา เด็กและวัยรุ่น ผู้ใหญ่ ผู้สูงอายุ",
        image: "/doctor/d5.png",
    },
    {
        title: "ดร. สมชาย ก่อเกียรติ",
        subtitle: "นักจิตวิทยา ผู้สูงอายุ",
        image: "/doctor/d6.png",
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
              onClick={() => alert('Card clicked!')} // รอใส่ modal
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
