import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function TopHeader() {
    return (
        <div className="bg-topheader text-white py-2">
            <div className="flex justify-between items-center w-full px-4">
                {/* Left Section */}
                <div className="flex space-x-4 font-anuphan pl-4">
                    <Link href="/main" className="hover:underline">
                        หน้าหลัก
                    </Link>
                    <span>|</span>
                    <Link href="/main" className="hover:underline">
                        เกี่ยวกับเรา
                    </Link>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4 font-montserrat pr-4">
                    {/* Facebook */}
                    <a 
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                    >
                        <Image src="/icon/facebook.png" alt="Facebook Icon" width={24} height={24}/>
                        <span>Smiley Hours</span>
                    </a>

                    {/* Line */}
                    <a 
                        href="https://line.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                    >
                        <Image src="/icon/line.png" alt="Line Icon" width={24} height={24}/>
                        <span>Smiley Hours</span>
                    </a>

                    {/* Phone */}
                    <a 
                        href="tel:084-226-2999"
                        className="flex items-center space-x-2 hover:underline"
                    >
                        <Image src="/icon/phone.png" alt="Phone Icon" width={24} height={24}/>
                        <span>084-226-2999</span>
                    </a>

                    {/* Notification */}
                    <button className="hover:bg-blue-500 p-1 rounded-full">
                        <Image src="/icon/noti.png" alt="Notification Icon" width={24} height={24}/>
                    </button>

                    {/* Divider */}
                    <span>|</span>

                    {/* Sign In */}
                    <Link href="/signin">
                        <button className="bg-white text-topheader font-bold px-2 py-1.5 rounded hover:bg-gray-200">
                            Sign In
                        </button>
                    </Link>     
                </div>
            </div>
        </div>
    );
}
