"use client"
import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status != "authenticated") {
        router.push("/signin")
    }
    console.log(session?.user)
    {/* Navbar */}
    const menuItems = [
      { href: "/home", label: "หน้าหลัก" },
      { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
      { href: "/appointmentrecord", label: "นัดหมาย" },
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
  