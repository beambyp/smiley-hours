"use client"

import React from "react";
import Image from "next/image";

type AsessmentResultProps = {
    result: string
};

const AsessmentResult: React.FC<AsessmentResultProps> = ({ result }) => {
    const handleAdvice = (result: string) => {
        if (result == "ปกติ") {
            return(
                <div>ท่านจัดอยู่ในกลุ่มคนที่มีพลังสุขภาพจิตปกติทั่วไป ขอให้ท่านพัฒนาตนเองด้วยการเสริมสร้างพลังสุขภาพจิตให้เพิ่มขึ้นหรือคงอยู่ต่อไป</div>
            );
        }
        if (result == "สูงกว่าปกติ") {
            return(
                <div>ท่านจัดอยู่ในกลุ่มคนที่มีพลังสุขภาพจิตดีเยี่ยม ขอให้ท่านรักษาศักยภาพด้านนี้ไว้</div>
            );
        }
        if (result == "ต่ำกว่าปกติ") {
            return(
                <div>
                <div className="">คำแนะนำด้านความทนต่อแรงกดดัน: </div>
                <div className="text-xl mb-4 ml-8">ท่านสามารถพัฒนาศักยภาพด้านนี้ได้โดยเริ่มต้นจากการควบคุมอารมณ์ ฝึกหายใจเข้าออกช้าๆ ลึกๆ และคิดถึงสิ่งที่ยึดเหนี่ยวจิตใจ</div>
                <div className="">คำแนะนำด้านการมีความหวังและกำลังใจ:</div>
                <div className="mb-4 ml-8">ท่านสามารถพัฒนาศักยภาพด้านนี้ได้โดยคิดถึงสิ่งดีดีที่มีอยู่ หมั่นพูดให้กำลังใจตนเอง คิดถึงโอกาสข้างหน้าหากฝ่าฟันจุดนี้ไปได้</div>
                <div className="">คำแนะนำด้านการต่อสู้เอาชนะอุปสรรค: </div>
                <div className="mb-4 ml-8">ท่านสามารถพัฒนาศักยภาพด้านนี้ได้โดยฝึกคิดหาทางออกในการแก้ปัญหา ข้อดีข้อเสียในแต่ละวิธีการ เลือกวิธีการที่ดีที่สุดและคิดหาวิธีการสำรองไว้ การแก้ไขปัญหาได้สำเร็จจะช่วยให้ท่านเห็นว่าการแก้ไขปัญหาไม่ใช่เรื่องยากและมีทักษะที่ดีในการแก้ไขปัญหาได้</div>
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="text-2xl text-center mb-6">ผลการประเมิน</div>
            <div className="text-2xl text-center mb-6">สุขภาพจิตของท่านอยู่ในระดับ {result}</div>
            <div className="text-xl text-left text-black mb-10 px-20">
                {handleAdvice(result)}
            </div>
            <div className="flex justify-center">
                <Image src="/logo/logo.png" alt="Logo" width={200} height={80} className="mx-auto" />
            </div>
        </div>
    );
}
export default AsessmentResult;