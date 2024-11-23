"use client"

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";
import Card from "../ui/component/card";



export default function Page() {

    return (
        <div>
          <TopHeader />
            <Navbar />
            <ImageSlider1 />
          <main className="container bg-foreground flex justify-center items-center mx-auto px-30 py-10 pl-40">
            <div className="grid md:grid-cols-3 gap-24 ml-20 mr-0 pr-60">
              {/* ตัวอย่าง Card */}
              <Card 
                title="โรคทางใจ"
                subtitle="ของคนวัยทำงาน"
                image="/article/photo/a1.png"
                description="พญ. ธรรมาภรณ์ บุญวิสุทธ"
                pdfUrl="/article/pdf/a1.pdf"
              />
              <Card
                title="พื้นที่ปลอดภัย"
                subtitle="ของใจ ในที่ทำงาน"
                image="/article/photo/a2.png"
                description="ภูษณิศา ยังอยู่"
                pdfUrl="/article/pdf/a2.pdf"
              />
              <Card
                title="Social support"
                subtitle="ทำอย่างไรให้สังคมที่ทำงานน่าอยู่"
                image="/article/photo/a3.png"
                description="อภิชญา พลเยี่ยม"
                pdfUrl="/article/pdf/a3.pdf"
              />
              <Card
                title="รักอย่างไร"
                subtitle="ไม่ให้ หมดโปร"
                image="/article/photo/a4.png"
                description="พญ.วนัทดา ถมค้าพาณิชย"
                pdfUrl="/article/pdf/a4.pdf"
              />
              <Card
                title="อยากรัก ต่างวัย"
                subtitle="ต้องรู้อะไรบ้าง"
                image="/article/photo/a5.png"
                description="วาทมอน แก้วสมสอน"
                pdfUrl="/article/pdf/a5.pdf"
              />
              <Card
                title="Q&A ถูกแฟนทำร้าย"
                subtitle="ควรทำอย่างไร"
                image="/article/photo/a6.png"
                description="พญ. ณัชศศิสม อรุณรัตนพงศ"
                pdfUrl="/article/pdf/a6.pdf"
              />
            </div>
          </main>
          <Footer/>
        </div>
      );
};