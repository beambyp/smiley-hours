"use client"

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";


export default function Page() {

    return (
        <div>
          <TopHeader />
            <Navbar />
            <ImageSlider1 />
            <div className="container bg-foreground justify-center mx-auto px-10 py-20">
            {/* Header Section */}
            <header className="text-center py-10">
                <h1 className="text-4xl font-bold text-blue-600">Smiley Hours</h1>
                <p className="text-lg text-gray-600 mt-4">
                มีนักจิตวิทยาพร้อมให้คำปรึกษามากมาย พร้อมรับฟังและเข้าใจทุกปัญหาของคุณ
                </p>
            </header>

            {/* Tabs Section */}
            <div className="flex justify-center space-x-4 mb-8">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
                ทั้งหมด
                </button>
                <button className="px-6 py-2 bg-blue-100 text-blue-500 rounded-lg">
                เด็กและวัยรุ่น
                </button>
                <button className="px-6 py-2 bg-blue-100 text-blue-500 rounded-lg">
                ผู้ใหญ่
                </button>
                <button className="px-6 py-2 bg-blue-100 text-blue-500 rounded-lg">
                ผู้สูงอายุ
                </button>
            </div>
          </div>
          {/* <Footer/> */}
        </div>
      );
};