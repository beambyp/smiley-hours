"use client";

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import Consentform from "../ui/component/consentform";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    const role = session?.user.Role;
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
            { href: "/scheduleD", label: "ตารางงาน" },
            { href: "/appointmentrecord", label: "นัดหมาย" },
            { href: "/result", label: "ผลวินิจฉัย" },
            { href: "/medicalrecord", label: "ประวัติการรักษา" },
        ];
    }
    return (
        <div>
            <TopHeader />
            <Navbar menuItems={menuItems} />
            <ImageSlider1 />
            <main className="container bg-foreground mx-auto py-10 shadow-2xl">
                <header className="text-center py-10">
                    <h1 className="font-anuphan text-5xl font-bold text-[#2B6EB0]">ทำรายการนัดหมาย</h1>
                </header>
                <Consentform />
            </main>
            <Footer />
        </div>
    );
}

