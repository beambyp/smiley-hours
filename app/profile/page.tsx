"use client";

import { useEffect, useState } from "react";
import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import Footer from "../ui/component/footer";
import PsychologistAccount from "../ui/accountpreferences/psychologistInfo";
import UserAccount from "../ui/accountpreferences/userInfo";

export default function Page() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        // ดึง role จาก localStorage เมื่อ component โหลด
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);

    const menuItems =
        role === "User"
            ? [
                  { href: "/home", label: "หน้าหลัก" },
                  { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
                  { href: "/appointmentrecord", label: "นัดหมาย" },
                  { href: "/medicalrecord", label: "ประวัติการรักษา" },
                  { href: "/article", label: "บทความ" },
              ]
            : [
                  { href: "/home", label: "หน้าหลัก" },
                  { href: "/scheduleD", label: "ตารางงาน" },
                  { href: "/appointmentrecord", label: "นัดหมาย" },
                  { href: "/result", label: "ผลวินิจฉัย" },
                  { href: "/medicalrecord", label: "ประวัติการรักษา" },
              ];

    const renderAccountPage = () => {
        if (role === "User") {
            return <UserAccount />;
        } else if (role === "Psychologist") {
            return <PsychologistAccount />;
        } 
    };

    return (
        <div>
            <TopHeader />
            <Navbar menuItems={menuItems} />
            <main className="container bg-foreground mx-auto py-10 shadow-2xl">
                {renderAccountPage()}
            </main>
            <Footer />
        </div>
    );
}
