import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-header py-1">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-start space-x-4">
          <Image src="/logo/logo.png" alt="Logo" width={110} height={80} />
          <div className="flex flex-col py-4">
            <Image
              src="/logo/fontlogo.png"
              alt="Smiley Hours Logo"
              width={220}
              height={80}
            />
            <p className="text-headerfont text-sm font-montserrat mt-1">
              Psychologist Consultation System
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-32 font-anuphan text-navfont text-2xl pr-12">
          <Link href="/main" className="hover:scale-110 hover:font-bold transition-transform duration-300">
            หน้าหลัก
          </Link>
          <Link href="/main" className="hover:scale-110 hover:font-bold transition-transform duration-300">
            ผู้ให้คำปรึกษา
          </Link>
          <Link href="/main" className="hover:scale-110 hover:font-bold transition-transform duration-300">
            แบบประเมินตนเอง
          </Link>
          <Link href="/main" className="font-bold hover:scale-110 hover:font-bold transition-transform duration-300">
            บทความ
          </Link>
        </div>
      </div>
    </div>
  );
}
