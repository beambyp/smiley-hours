import React from "react";
import Image from "next/image";
import Link from "next/link";

{/* Menu Item */}
interface MenuItem {
  href: string;
  label: string;
}

{/* Prob */}
interface NavbarProps {
  menuItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ menuItems }) => {
  return (
    <div className="bg-header py-1 shadow-2xl shadow-gray-500/50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <div className="flex items-start space-x-4 px-6">
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

        {/* Navigation Section */}
        <div className="flex justify-center items-center space-x-32 font-anuphan text-navfont text-xl md:text-2xl md:pl-8">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} className="hover:scale-110 hover:font-bold transition-transform duration-300">
                {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
