"use client";

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import ImageSlider2 from "../ui/component/imageslider2";
import Footer from "../ui/component/footer";
import Card from "../ui/component/card";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session, status } = useSession();
    {/* Navbar */ }
    let menuItems = [];
    if (status === "authenticated" && session?.user.Role == "User") {
        menuItems = [
            { href: "/home", label: "หน้าหลัก" },
            { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
            { href: "/appointmentrecord", label: "นัดหมาย" },
            { href: "/medicalrecord", label: "ประวัติการรักษา" },
            { href: "/article", label: "บทความ" },
        ];
    }
    else if (status === "authenticated" && session?.user.Role == "Psychologist") {
        menuItems = [
            { href: "/home", label: "หน้าหลัก" },
            { href: "/schedule", label: "ตารางงาน" },
            { href: "/appointmentrecord", label: "นัดหมาย" },
            { href: "/result", label: "ผลวินิจฉัย" },
            { href: "/medicalrecord", label: "ประวัติการรักษา" },
        ];
    } else {
        menuItems = [
            { href: "/home", label: "หน้าหลัก" },
            { href: "/selectDoc", label: "ผู้ให้คำปรึกษา" },
            { href: "/selfAssessment", label: "แบบประเมินตนเอง" },
            { href: "/article", label: "บทความ" },
        ];
    }

    {/* Card */ }
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

    const handleButton = () => {
        if (status === "authenticated" && session?.user.Role == "User" || status === "unauthenticated") {
            return (
                <div className="mt-16 flex flex-col">
                    <Link href="/appointmentrecord">
                        <div className="inline-flex w-[120%] h-0 px-12 py-7 bg-[#96C7FF] rounded-t-lg border border-b-gray-300 justify-center items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="text-black text-2xl font-[400] font-anuphan break-words">นัดหมาย</div>
                        </div>
                    </Link>
                    <Link href="/selectDoc">
                        <div className="inline-flex w-[120%] h-0 px-12 py-7 bg-[#96C7FF] border border-b-gray-300 justify-center items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="text-black text-2xl font-[400] font-anuphan break-words">ผู้ให้คำปรึกษา</div>
                        </div>
                    </Link>
                    <Link href="/selfAssessment">
                        <div className="inline-flex w-[120%] h-0 px-12 py-7 bg-[#96C7FF] rounded-b-lg border border-b-gray-300 justify-center items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="text-black text-2xl font-[400] font-anuphan break-words">แบบประเมินตนเอง</div>
                        </div>
                    </Link>
                </div>
            )
        }
        else if (status === "authenticated" && session?.user.Role == "Psychologist") {
            return (
                <div className="mt-16 flex flex-col">
                    <Link href="/schedule">
                        <div className="inline-flex w-[120%] h-0 px-12 py-7 bg-[#96C7FF] rounded-t-lg border border-b-gray-300 justify-center items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="text-black text-2xl font-[400] font-anuphan break-words">ตารางงาน</div>
                        </div>
                    </Link>
                    <Link href="/appointmentrecord">
                        <div className="inline-flex w-[120%] h-0 px-12 py-7 bg-[#96C7FF] border border-b-gray-300 justify-center items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="text-black text-2xl font-[400] font-anuphan break-words">นัดหมายของฉัน</div>
                        </div>
                    </Link>
                    <Link href="/result">
                        <div className="inline-flex w-[120%] h-0 px-12 py-7 bg-[#96C7FF] rounded-b-lg border border-b-gray-300 justify-center items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="text-black text-2xl font-[400] font-anuphan break-words">ผลวินิจฉัย</div>
                        </div>
                    </Link>
                </div>
            )
        }
    }

    return (
        <div>
            <TopHeader />
            <Navbar menuItems={menuItems} />
            <ImageSlider1 />

            {/* Section 1*/}
            <section className="container bg-foreground flex flex-col justify-center items-center mx-auto py-20 shadow-2xl min-h-screen">
                {/* Section 1.1: Logo and Buttons */}
                <div className="flex justify-center items-center mb-28 mt-20">
                    <div className="flex items-start gap-60">
                        <div className="flex flex-col items-center">
                            {/* Logo */}
                            <img src="/logo/logo.png" alt="Smiley Hours" className="w-64 mb-4" />
                            {/* Text */}
                            <h2 className="text-xl font-auanpan font-semibold mb-2 text-center whitespace-nowrap">
                                ทางเลือกที่ใช่ สำหรับคนไม่ต้องการเดินทาง
                            </h2>
                        </div>

                        {/* Right Section: Buttons */}
                        {handleButton()}
                    </div>
                </div>

                {/* Section 1.2: vdo how to use */}
                <div
                    className="relative w-full h-[500px] flex items-center bg-cover bg-center mb-20 mt-10"
                    style={{ backgroundImage: "url('/home/BgHome.png')" }}
                >
                    <div className="container mx-auto px-6">
                        {/* Text Content */}
                        <div className="flex flex-col max-w-2xl">
                            <h1 className="font-akshar text-5xl font-bold text-[#2A5A8C] pl-10 leading-relaxed">
                                Smiley Hours
                            </h1>
                            <h2 className="font-anuphan text-6xl font-semibold text-[#2A5A8C] pl-80 leading-relaxed">
                                ใช้งานยังไง?
                            </h2>
                            <p className="font-anuphan text-2xl font-light text-[#2A5A8C] pl-11 leading-relaxed">
                                ใช้งานง่าย ตอบโจทย์ทุกการนัดหมาย
                            </p>
                            <p className="font-anuphan text-[#2A5A8C] mb-8 space-x-4">
                                <span className="text-2xl font-bold">ให้การนัดเป็นเรื่องง่าย </span>
                                <span className="text-3xl font-black leading-[4]">เพียงปลายนิ้วสัมผัส</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ImageSlider2 */}
            <div className="w-full">
                <ImageSlider2 />
            </div>

            {/* Section 2: Cards */}
            {session?.user.Role != "Psychologist" && (
                <section className="container bg-foreground flex flex-col justify-center items-center mx-auto py-8 shadow-2xl min-h-screen">
                    {/* Section 2.1: title article */}
                    <div
                        className="relative w-[1536px] h-[450px] flex items-center bg-cover bg-center mt-20"
                        style={{ backgroundImage: "url('/home/BgHome2.png')" }}
                    >
                        <div className="container flex justify-end">
                            {/* Text Content */}
                            <div className="flex flex-col max-w-4xl">
                                <h2 className="font-anuphan text-6xl font-bold text-[#2A5A8C] pr-60 leading-relaxed">
                                    บทความที่เกี่ยวข้อง
                                </h2>
                            </div>
                        </div>
                    </div>
                    {/* Section 2.2: Cards */}
                    <div className="w-full py-40">
                        <div className="grid md:grid-cols-3 gap-x-10 gap-y-24 pr-40 pl-60">
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
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
