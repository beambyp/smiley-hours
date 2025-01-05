import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

{/* Menu Item */}
interface MenuItem {
  href: string;
  label: string;
}

{/* Props */}
interface NavbarProps {
  menuItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

        {/* Desktop Navigation Section */}
        <div className="hidden md:flex justify-center items-center space-x-20 font-anuphan text-navfont text-lg lg:text-xl">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="hover:scale-110 hover:font-bold transition-transform duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-header">
          <div className="flex flex-col items-start px-6 py-4 space-y-2 font-anuphan text-navfont text-lg">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="w-full hover:bg-gray-200 hover:font-bold px-2 py-1 rounded transition duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
