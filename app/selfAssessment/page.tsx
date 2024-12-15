"use client"

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import AssessmentForm from  "../ui/selfAssessment/assessmentForm";
import AsessmentResult from "../ui/selfAssessment/assessmentResult";

export default function Page() {
    const { data: session, status } = useSession();
    const [submit, setSubmit] = useState(false)
    const [result,setResult] = useState("")

    const handleSubmit = (result:string) => {
        setSubmit(true)
        setResult(result)
    }

    // Navbar Menu Items
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

    return (
        <div>
            <TopHeader />
            <Navbar menuItems={menuItems} />
            <ImageSlider1 />
            <main className="container bg-foreground mx-auto py-10 shadow-2xl">
                <div className="flex-row justify-center items-center">
                    {!submit ? (
                        <AssessmentForm onSelect={handleSubmit} />
                    ) : (
                        <AsessmentResult 
                            result={result}
                        />
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
