"use client";

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import Schedules from "../ui/component/schedule";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session, status } = useSession();
    {/* Navbar */ }
    let menuItems = [];
    if (status === "authenticated" && session?.user) {
        menuItems = [
            { href: "/home", label: "หน้าหลัก" },
            { href: "/selectDoc", label: "ตารางงาน" },
            { href: "/appointment", label: "นัดหมาย" },
            { href: "/main", label: "ผลวินิจฉัย" },
            { href: "/article", label: "ประวัติการรักษา" },
        ];
    } else {
        menuItems = [
            { href: "/home", label: "หน้าหลัก" },
            { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
            { href: "/main", label: "แบบประเมินตนเอง" },
            { href: "/article", label: "บทความ" },
        ];
    }

    return (
        <div>
            <TopHeader />
            <Navbar menuItems={menuItems} />
            <ImageSlider1 />
            <main className="container bg-foreground mx-auto shadow-2xl">
                <Schedules />
            </main>
            <Footer />
        </div>
  );
}

