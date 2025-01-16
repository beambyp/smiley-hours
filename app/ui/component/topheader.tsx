"use client"
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import dayjs from 'dayjs';
import { DateTime } from 'next-auth/providers/kakao';

type AppointmentData = {
    appointmentDate: DateTime,
    Email: string,
    Name: string,
};

export default function TopHeader() {
    const { data: session, status } = useSession();
    const [notifications, setNotifications] = useState<AppointmentData[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("/api/notification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: session?.user.email,
                    role: session?.user.Role,
                })
            })
            const data = await response.json();
            if (Array.isArray(data)) {
                const mappedData: AppointmentData[] = data.map((record) => ({
                    appointmentDate: record.appointmentDate,
                    Email: record.Email,
                    Name: record.Name,
                }));
                setNotifications(mappedData);
            }
        } catch (error) {
            console.error("Error fetching notification:", error);
        }
    };
    useEffect(() => {
        fetchAppointments();
        const interval = setInterval(fetchAppointments, 300000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-topheader text-white py-2">
            <div className="flex justify-between items-center w-full px-4">
                {/* Left Section */}
                <div className="flex space-x-4 font-anuphan pl-4">
                    <Link href="/home" className="hover:underline">
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
                        <Image src="/icon/facebook.png" alt="Facebook Icon" width={24} height={24} />
                        <span>Smiley Hours</span>
                    </a>

                    {/* Line */}
                    <a
                        href="https://line.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                    >
                        <Image src="/icon/line.png" alt="Line Icon" width={24} height={24} />
                        <span>Smiley Hours</span>
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:084-226-2999"
                        className="flex items-center space-x-2 hover:underline"
                    >
                        <Image src="/icon/phone.png" alt="Phone Icon" width={24} height={24} />
                        <span>084-226-2999</span>
                    </a>

                    {/* Notification */}
                    {status === "authenticated" && (
                        <div className="relative">
                            <button
                                className="hover:bg-blue-500 p-1 rounded-full"
                                onClick={() => setDropdownVisible(!isDropdownVisible)}
                            >
                                <Image src="/icon/noti.png" alt="Notification Icon" width={24} height={24} />
                                {notifications.length > 0 && (
                                    <span className="absolute top-0 right-0 bg-[#c04e65] text-white text-xs rounded-full px-2">
                                        {notifications.length}
                                    </span>
                                )}
                            </button>
                            {/* Dropdown Notification List */}
                            {isDropdownVisible && (
                                <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-4 z-10">
                                    <p className="text-gray-500 mb-4">Upcoming Appointment</p>
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => (
                                            <div
                                                key={index}
                                                className="p-2 border-b last:border-none hover:bg-gray-100"
                                            >
                                                <div className='flex flex-row items-center space-x-4'>
                                                    <div>
                                                        <Image
                                                            src="/logo/logo.png"
                                                            alt="Smiley Hours Logo"
                                                            width={80}
                                                            height={80}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-black">{notification.Name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {dayjs(notification.appointmentDate).format("DD MMMM YYYY")}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {dayjs(notification.appointmentDate).format("h:mm A")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="p-5 text-gray-500 text-center">No upcoming appointment</p>
                                    )}
                                </div>
                            )}
                        </div>)}

                    {/* Divider */}
                    <span>|</span>

                    {/* Sign In */}
                    {status === "authenticated" && session?.user ? (
                        <div className='flex flex-row'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q1.325 0 2.5-.387t2.15-1.113q-.975-.725-2.15-1.112T12 17t-2.5.388T7.35 18.5q.975.725 2.15 1.113T12 20m0-9q.65 0 1.075-.425T13.5 9.5t-.425-1.075T12 8t-1.075.425T10.5 9.5t.425 1.075T12 11m0 7.5" /></svg>
                            <button onClick={() => {
                                signOut({ callbackUrl: "/home" });
                            }} className="bg-white text-topheader font-bold px-2 py-1.5 rounded hover:bg-gray-200 ml-4">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link href="/signin">
                            <button className="bg-white text-topheader font-bold px-2 py-1.5 rounded hover:bg-gray-200">
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
