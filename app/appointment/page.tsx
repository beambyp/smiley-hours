"use client"
import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";

export default function Page() {
    {/* Navbar */}
    const menuItems = [
      { href: "/main", label: "หน้าหลัก" },
      { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
      { href: "/appointment", label: "นัดหมาย" },
      { href: "/main", label: "ประวัติการรักษา" },
      { href: "/article", label: "บทความ" },
    ];
  
    return (
      <div>
        <TopHeader />
        <Navbar menuItems={menuItems} />
        <ImageSlider1 />
        <main className="container bg-foreground mx-auto py-10 shadow-2xl">
            
        </main>
        <Footer />
      </div>
    );
  }
  