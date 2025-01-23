"use client";

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import Footer from "../ui/component/footer";
import PsychologistAccount from "../ui/component/accountpreferences";

export default function Page() {
    //const { data: session } = useSession();
    //const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
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
            <main className="container bg-foreground mx-auto py-10 shadow-2xl">
                <PsychologistAccount />
            </main>
            <Footer />
        </div>
    );
}

