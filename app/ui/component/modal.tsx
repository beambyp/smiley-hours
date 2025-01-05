"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  title: string;
  image: string;
  categories: string;
  specialization: string;
  gender: string;
  workplace: string;
  licensenumber: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  email,
  title,
  image,
  categories,
  specialization,
  gender,
  workplace,
  licensenumber,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter()

  const handleClick = () => {
    if (status === "authenticated" && session?.user) {
      // Save data to localStorage
      localStorage.setItem("doctorTitle", title);
      localStorage.setItem("doctorEmail", email);

      // Redirect to the appointment process page
      router.push ("/processAppointment")
    } else {
      // Redirect to the sign-in page
      router.push ("/signin")
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#3074B7] p-8 rounded-lg shadow-lg w-[28rem] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-white hover:text-gray-300"
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="flex justify-center mb-4">
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-[#378CDE]"
          />
        </div>
        <h2 className="text-white text-2xl font-bold text-center">{title}</h2>
        <p className="text-lg text-center text-white mb-4">
          เลขใบประกอบ {licensenumber}
        </p>
        <p className="text-xl text-white">สาขาที่เชี่ยวชาญ:</p>
        <p className="text-lg text-white mb-4">{categories}</p>
        <p className="text-xl text-white">ความเชี่ยวชาญ:</p>
        <p className="text-lg text-white mb-4">{specialization}</p>
        <p className="text-lg text-white mb-4">เพศ: {gender}</p>
        <p className="text-lg text-white mb-5">สถานที่ทำงาน: {workplace}</p>
        <button
          type="submit"
          className="w-full bg-white hover:bg-blue-200 text-[#3074B7] py-1.5 rounded-md font-medium transition duration-150"
          onClick={handleClick}
        >
          นัดหมาย
        </button>
      </div>
    </div>
  );
};

export default Modal;
