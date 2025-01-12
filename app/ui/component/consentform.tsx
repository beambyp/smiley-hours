import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import ภาษาไทย
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface AppointmentData {
  appointmentId: number;
  appointmentDate: string;
  Name: string;
  isCancel: boolean;
  symptom: string;
  status: string;
}

const Consentform: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user.email;
  const role = session?.user.Role;
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);
  useEffect(() => {
    const storedData = localStorage.getItem("appointmentData");
    if (storedData) {
      setAppointmentData(JSON.parse(storedData));
      console.log(appointmentData);
    }
  }, []);

  const [step, setStep] = useState(1); // จัดการสถานะของขั้นตอน
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    date: "",
    agreement: false,
    symptoms: "",
    time: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    date: false,
    agreement: false,
    symptoms: false,
    time: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Reset errors when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validateStep1 = () => {
    if (appointmentData?.appointmentDate) {
      setFormData((prevData) => ({
        ...prevData,
        date: dayjs(appointmentData.appointmentDate).format('YYYY-MM-DD')
      }));
    }
    const newErrors = {
      firstName: formData.firstName.trim() === "",
      lastName: formData.lastName.trim() === "",
      date: formData.date.trim() === "",
      agreement: !formData.agreement,
      symptoms: false, // ไม่ต้องตรวจสอบใน Step 1
      time: false, // ไม่ต้องตรวจสอบใน Step 1
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true); // true ถ้าข้อมูลครบถ้วน
  };

  const validateStep2 = () => {
    const newErrors = {
      firstName: formData.firstName.trim() === "",
      lastName: formData.lastName.trim() === "",
      date: formData.date.trim() === "",
      agreement: false,
      symptoms: formData.symptoms.trim() === "",
      time: formData.time.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true); // true ถ้าข้อมูลครบถ้วน
  };
  console.log(validateStep2);

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      console.log("Step 1 validated");
      setStep(2); // ไป Step 2
    }
    if (step === 1 && appointmentData) {
      console.log("Step 3 validated");
      setStep(3); // ไป Step 3
    } if (step === 2 && validateStep1()) {
      console.log("Step 2 validated");
      setStep(3); // ไป Step 2
    }
  };

  const handleBack = () => {
    if (step === 3) {
      console.log("Step 2 validated");
      setStep(2);
    }
    if (step === 3 && appointmentData) {
      console.log("Step 1 validated");
      setStep(1);
    }
  };

  const handleSubmit = async () => {
    let response;
    const appointmentDate = dayjs(`${formData.date}T${formData.time}`).format("YYYY-MM-DDTHH:mm:ss");
    try {
      if (appointmentData) {
        response = await fetch('/api/consentform', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: appointmentData?.appointmentId,
            userEmail: user,
          }),
        });
      } else {
        response = await fetch('/api/appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: user,
            psychologistEmail: doctorEmail,
            role: role,
            appointmentDate: appointmentDate,
            symptom: formData.symptoms,
          })
        });
      }
      if (response.ok) {
        console.log('Consent Form created successfully');
        localStorage.clear();
        setStep(4);
      } else {
        console.error('Failed to create ccnsent form');
      }
    } catch (error) {
      console.error('An error occurred while creating the consent form:', error);
    }
  }

  const addOneHourToTime = (time: string): string => {
    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error("Invalid time format.");
    }

    // Add 1 hour to the hours
    const newHours = (hours + 1) % 24; // Wrap around at 24 hours for a 24-hour clock

    // Format back to "HH:mm"
    return `${newHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const DateDisplay: React.FC<{ date: string }> = ({ date }) => {
    // ตั้งค่าภาษาเป็นภาษาไทย
    //dayjs.locale("th");
    // วันที่ที่ต้องการแสดง
    const displayDate = dayjs(date);
    // ฟอร์แมตวันที่
    const formattedDate = displayDate.format("dddd D MMMM YYYY"); // เช่น วันอังคาร ที่ 10

    return <span>{formattedDate}</span>;
  };

  const [doctorTitle, setDoctorTitle] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  useEffect(() => {
    // Retrieve data from localStorage
    const title = localStorage.getItem("doctorTitle");
    const email = localStorage.getItem("doctorEmail");
    if (title) {
      setDoctorTitle(title);
    }
    if (email) {
      setDoctorEmail(email);
    }
  }, []);

  const [availableSchedule, setAvailableSchedule] = useState<
    { date: string; startTime: string; endTime: string }[]
  >([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('/api/schedule/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            psychologistEmail: doctorEmail,
          }),
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          const sortedData = data.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.startTime}`);
            const dateB = new Date(`${b.date}T${b.startTime}`);
            return dateA.getTime() - dateB.getTime();
          });
          setAvailableSchedule(sortedData);
          console.log(availableSchedule);
        } else {
          console.error('Failed to get schedule information');
        }
      } catch (error) {
        console.error('An error occurred while getting the schedule:', error);
      }
    };
    fetchSchedule();
  }, [doctorEmail]);

  console.log(availableSchedule);
  console.log(formData);

  function generateTimeSlots(startTime: string, endTime: string, interval: number) {
    const start = new Date(`${formData.date}T${startTime}:00`);
    const end = new Date(`${formData.date}T${endTime}:00`);
    const timeSlots = [];

    while (start <= end) {
      const formattedTime = start.toLocaleTimeString('th-Th', { hour: '2-digit', minute: '2-digit' });
      timeSlots.push(formattedTime);
      start.setMinutes(start.getMinutes() + interval);
    }

    return timeSlots;
  }

  return (
    <div className="bg-gray-100 p-6 max-h-6xl min-h-screen">
      {/* Step 1: แสดงเนื้อหาข้อตกลง */}
      {step === 1 && (
        <div className="p-6 max-w-6xl mx-auto">
          <h2 className="font-anuphan text-3xl text-[#2B6EB0] font-bold mb-10">
            แบบฟอร์มข้อตกลงการให้บริการทางออนไลน์
          </h2>
          <div className="bg-[#D1E3F6] font-anuphan h-[500px] scrollbar-visible border border-gray-300 rounded-md p-6 text-2xl">
            <p>
              1) Smiley Hours สร้างช่องทางการให้คำปรึกษาผ่านทางออนไลน์เพื่อประโยชน์
              ของผู้ต้องการคำปรึกษา ทั้งนี้เนื่องมาจากสถานการณ์โควิดและเพื่อช่วยให้ผู้
              ที่อยู่ไกลหรือมีปัญหาการเดินทางสามารถเข้าถึงบริการ ได้รับการบริการอย่าง
              ทันท่วงทีก่อนอาการจะกำเริบมากขึ้น อย่างไรก็ตามด้วยข้อจำกัดบางอย่าง
              ของการตรวจรักษาทางออนไลน์ เช่น นักจิตวิทยาไม่สามารถสังเกตพฤติกรรม
              ของผู้ใช้บริการในขณะรับคำปรึกษาได้ทั้งหมด ทำให้นักจิตวิทยาอาจมีข้อจำกัด
              ในการวินิจฉัยและให้คำแนะนำ ทั้งนี้ผู้มารับบริการจะต้องยอมรับในข้อจำกัด
              ต่างๆเหล่านี้
            </p>
            <p>
              2) การให้คำปรึกษาผ่านทางออนไลน์จะใช้รูปแบบวีดีโอคอลโดยจะส่งลิงค์ใน
              การเข้าร่วมวีดีโอคอลผ่านแชทที่อยู่ภายในหน้าเว็บ ทั้งนี้เพื่อให้จิตแพทย์
              สามารถสังเกตพฤติกรรม และตรวจสภาพจิตผู้มารับบริการได้ ซึ่งการตรวจ
              สภาพจิตนี้นับว่าเป็นสิ่งสำคัญต่อการวินิจฉัยและให้คำแนะนำถึงอาการของ
              ผู้มารับบริการ
            </p>
            <p>
              3) ผู้มารับการปรึกษาจะต้องเปิดเผยชื่อนามสกุลจริง ตลอดจนข้อมูลต่างๆ
              ได้แก่ อาการเบื้องต้นที่ทำให้อยากเข้ารับการปรึกษา ทั้งนี้เนื่องจากการระบุ
              ตัวตนและข้อมูลเหล่านี้มีความสำคัญต่อการให้คำปรึกษาและต้องใช้ข้อมูล
              ประกอบในการวินิจฉัยและให้คำแนะนำของนักจิตวิทยา
            </p>
            <p>
              4) ผู้รับการปรึกษาควรเตรียมสถานที่ที่จะวีดีโอคอลคุยกับนักจิตวิทยาให้
              เหมาะสม เป็นที่ไม่เสียงดัง มีความเป็นส่วนตัว ตรงต่อเวลานัด และรักษา
              มารยาทในการวีดีโอคอลตามความเหมาะสม
            </p>
            <p>
              5) ห้ามมิให้มีการอัดวิดีโอ ถ่ายภาพหรืออัดเสียงในขณะตรวจรักษากับ
              นักจิตวิทยา เพื่อเป็นการเคารพสิทธิ์ของทั้งสองฝ่าย
            </p>
            <p>
              6) ผู้รับการปรึกษาจะต้องอ่านและให้ความยินยอมปฏิบัติตามข้อตกลงเกี่ยว
              กับการให้บริการนี้ เพื่อทำการนัดหมาย
            </p>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={formData.agreement}
                onChange={handleInputChange}
                className={`w-6 h-6 border ${errors.agreement ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2`}
              />
              <label
                htmlFor="agreement"
                className="font-anuphan text-[#C24C67] text-xl"
              >
                กรุณาคลิกที่ช่องเพื่อแสดงความยินยอมปฏิบัติตามข้อตกลง
              </label>
            </div>

            <div className="mt-10 flex space-x-4">
              <div className="w-1/3">
                <label className="block text-[#2B6EB0] font-anuphan font-medium text-lg mb-1">
                  ชื่อ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="--ชื่อ--"
                  className={`w-full border ${errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2`}
                />
              </div>
              <div className="w-1/3">
                <label className="block text-[#2B6EB0] font-anuphan font-medium text-lg mb-1">
                  นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="--นามสกุล--"
                  className={`w-full border ${errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2`}
                />
              </div>
              <div className="w-1/3">
                <label className="block text-[#2B6EB0] font-anuphan font-medium text-lg mb-1">
                  วันที่ <span className="text-red-500">*</span>
                </label>
                <select
                  name="date"
                  value={
                    appointmentData?.appointmentDate
                      ? dayjs(appointmentData.appointmentDate).format("YYYY-MM-DD")
                      : formData.date
                  }
                  onChange={handleInputChange}
                  className={`w-full border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-md p-2.5`}
                  disabled={!!appointmentData?.appointmentDate || availableSchedule.length === 0}
                >
                  {availableSchedule.length === 0 ? (
                    <option value="">No available schedule</option>
                  ) : (
                    <>
                      <option value="" disabled hidden>
                        Select a date
                      </option>
                      {availableSchedule.map((schedule, index) => (
                        <option key={index} value={schedule.date}>
                          {schedule.date}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>
            <button
              type="button"
              className="bg-[#2B6EB0] flex justify-between text-white font-akshar px-4 py-1 rounded-md mt-10 hover:bg-gray-300 hover:text-black text-lg ml-auto"
              onClick={handleNext}
            >
              ต่อไป
            </button>
          </div>
        </div>
      )}

      {/* Step 2: กรอกข้อมูล */}
      {step === 2 && (
        <div className="p-6 max-w-6xl mx-auto">
          <h2 className="font-anuphan text-3xl text-[#2B6EB0] font-bold mb-10">
            กรอกข้อมูลเพื่อทำรายการนัดหมาย
          </h2>
          <div className="bg-[#D1E3F6] p-10 rounded-md max-w-6xl mx-auto">
            <div className="grid grid-cols-2 space-x-8">
              <div className="col-span-1 w-1/2">
                <label className="block text-[#2B6EB0] font-anuphan font-md text-lg mb-1">
                  ชื่อ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="--ชื่อ--"
                  className={`w-full border ${errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2`}
                  readOnly={true}
                />
              </div>
              <div className="col-span-1 w-1/2">
                <label className="block text-[#2B6EB0] font-anuphan font-md text-lg mb-1">
                  นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="--นามสกุล--"
                  className={`w-full border ${errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 space-x-8 mt-4">
              <div className="col-span- w-1/2">
                <label className="block text-[#2B6EB0] font-anuphan font-medium text-lg mb-1">
                  เวลา <span className="text-red-500">*</span>
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-md p-2.5`}
                  disabled={!!appointmentData?.appointmentDate || availableSchedule.length === 0}
                >
                  {availableSchedule.length === 0 ? (
                    <option value="">No available schedule</option>
                  ) : (
                    availableSchedule
                      .filter(schedule => schedule.date === formData.date)
                      .flatMap((schedule, scheduleIndex) =>
                        generateTimeSlots(schedule.startTime, schedule.endTime, 30).map((timeSlot, timeSlotIndex) => (
                          <option key={`${scheduleIndex}-${timeSlotIndex}-${timeSlot}`} value={timeSlot}>
                            {timeSlot}
                          </option>
                        ))
                      )
                  )}
                </select>
              </div>
              <div className="col-span-1 w-1/2">
                <label className="block text-[#2B6EB0] font-anuphan font-medium text-lg mb-1">
                  วันที่ <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={appointmentData?.appointmentDate || formData.date}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.date ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2`}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-[#2B6EB0] font-anuphan font-md text-lg mb-1">
                อาการเบื้องต้น <span className="text-red-500">*</span>
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="--อาการเบื้องต้น--"
                className={`w-full border ${errors.symptoms ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2 h-80 resize-none`}
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            className="bg-[#2B6EB0] flex justify-between text-white font-anuphan px-4 py-1 rounded-md mt-10 hover:bg-gray-300 hover:text-black text-lg ml-auto"
            onClick={handleNext}
          >
            ต่อไป
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="p-6 max-w-6xl mx-auto">
          <h2 className="font-anuphan text-3xl text-[#2B6EB0] font-bold mb-10">
            ตรวจสอบรายการนัดหมาย
          </h2>
          <div className="bg-[#D1E3F6] p-10 rounded-md max-w-6xl mx-auto">
            <p className="font-anuphan text-2xl text-[#2B6EB0] font-semibold mb-10">
              <span>นักจิตวิทยา:</span>
              <span className="font-normal"> {appointmentData?.Name || doctorTitle}</span>
            </p>
            <p className="font-anuphan text-2xl text-[#2B6EB0] font-semibold mb-10">
              <span>วันที่: </span>
              <span className="font-normal">
                <DateDisplay date={appointmentData?.appointmentDate || formData.date} />
              </span>
            </p>
            <p className="font-anuphan text-2xl text-[#2B6EB0] font-semibold mb-10">
              <span>เวลา: </span>
              <span className="font-normal">
                {appointmentData?.appointmentDate
                  ? dayjs(appointmentData.appointmentDate).format('HH:mm') + " - " +
                  dayjs(appointmentData.appointmentDate).add(1, 'hour').format('HH:mm')
                  : formData.time + " - " + addOneHourToTime(formData.time)}{" "}
                น.
              </span>
            </p>
            <p className="font-anuphan text-2xl text-[#2B6EB0] font-semibold mb-6">
              อาการเบื้องต้น:
            </p>
            <p className="font-anuphan text-2xl text-[#2B6EB0] font-normal mb-10">
              {appointmentData?.symptom || formData.symptoms}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <button
              type="button"
              className="bg-[#2B6EB0] justify-start text-white font-anuphan px-4 py-1 rounded-md mt-10 hover:bg-gray-300 hover:text-black text-lg ml-auto"
              onClick={handleBack}
            >
              ย้อนกลับ
            </button>
            <div className="flex-grow"></div>
            <button
              type="button"
              className="bg-[#2B6EB0] text-white font-anuphan px-4 py-1 rounded-md mt-10 hover:bg-gray-300 hover:text-black text-lg ml-auto"
              onClick={handleSubmit}
            >
              นัดหมาย
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="p-6 max-w-6xl mx-auto">
          <h2 className="font-anuphan text-3xl text-[#2B6EB0] font-bold mb-10">
            รายการนัดหมายสมบูรณ์
          </h2>

          <div className="bg-[#D1E3F6] p-10 rounded-md shadow-md flex flex-col items-center">
            <Image src="/logo/logo.png" alt="Logo" width={200} height={200} />
            <p className="font-anuphan text-xl text-[#2B6EB0] font-semibold mb-2">
              รอรับการดูแลหัวใจ
            </p>
            <p className="font-anuphan text-lg text-[#2B6EB0] font-normal text-center">
              ตรวจสอบรายการนัดหมายได้ที่หน้านัดหมาย
            </p>
          </div>
          {/* Button */}
          <div className="flex justify-between items-end mt-2">
            <button
              type="button"
              className="bg-[#2B6EB0] flex justify-between text-white font-anuphan px-4 py-1 rounded-md mt-10 hover:bg-gray-300 hover:text-black text-lg ml-auto"
            >
              <Link href="/appointmentrecord">
                นัดหมายของฉัน
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consentform;
