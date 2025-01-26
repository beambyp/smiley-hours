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
        return null; // default fallback
    };

    // แสดง loader ระหว่างรอ role
    if (role === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TopHeader />
            <Navbar menuItems={menuItems} />
            <main className="container bg-foreground mx-auto py-10 shadow-2xl">
                {role && renderAccountPage()}
            </main>
            <Footer />
        </div>
    );
}
