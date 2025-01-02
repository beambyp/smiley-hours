import React, { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

const Schedule: React.FC = () => {
    const { data: session } = useSession();
    const user = session?.user.email;
    const [scheduleList, setScheduleList] = useState([
        { date: "", startTime: "", endTime: "" },
    ]);

    const [submittedSchedules, setSubmittedSchedules] = useState<
        { date: string; startTime: string; endTime: string }[]
    >([]);

    const [errors, setErrors] = useState<{ date: boolean; startTime: boolean; endTime: boolean }[]>([
        { date: false, startTime: false, endTime: false },
    ]);

    const availableTimes = Array.from({ length: 24 }, (_, hour) => {
        const formattedHour = hour.toString().padStart(2, "0");
        return [`${formattedHour}:00`, `${formattedHour}:30`];
    }).flat();
    
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch('/api/schedule/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        psychologistEmail: user,
                    }),
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    const sortedData = data.sort((a, b) => {
                        const dateA = new Date(`${a.date}T${a.startTime}`);
                        const dateB = new Date(`${b.date}T${b.startTime}`);
                        return dateA.getTime() - dateB.getTime();
                    });
                    setSubmittedSchedules(sortedData);
                } else {
                    console.error('Failed to get schedule information');
                }
            } catch (error) {
                console.error('An error occurred while getting the schedule:', error);
            }
        };

        fetchSchedule();
    }, [user]);

    const handleInputChange = (
        index: number,
        field: keyof typeof scheduleList[number],
        value: string
    ) => {
        const updatedList = [...scheduleList];
        updatedList[index][field] = value;
        setScheduleList(updatedList);

        const updatedErrors = [...errors];
        updatedErrors[index][field] = value.trim() === "";
        setErrors(updatedErrors);
    };

    const handleAddSchedule = () => {
        setScheduleList([...scheduleList, { date: "", startTime: "", endTime: "" }]);
        setErrors([...errors, { date: false, startTime: false, endTime: false }]);
    };

    const handleRemoveSchedule = (index: number) => {
        const updatedList = scheduleList.filter((_, i) => i !== index);
        const updatedErrors = errors.filter((_, i) => i !== index);
        setScheduleList(updatedList);
        setErrors(updatedErrors);
    };

    const handleSubmit = async () => {
        const newErrors = scheduleList.map((schedule) => ({
            date: schedule.date.trim() === "",
            startTime: schedule.startTime.trim() === "",
            endTime: schedule.endTime.trim() === "",
        }));

        setErrors(newErrors);

        const isValid = newErrors.every((error) => !error.date && !error.startTime && !error.endTime);

        if (isValid) {
            const sortedSchedules = [...submittedSchedules, ...scheduleList].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                if (a.startTime < b.startTime) return -1;
                if (a.startTime > b.startTime) return 1;
                return 0;
            });
            setSubmittedSchedules(sortedSchedules); // เพิ่มข้อมูลใน submittedSchedules และเรียงลำดับตามวันที่และเวลาเริ่ม
            setScheduleList([{ date: "", startTime: "", endTime: "" }]); // ล้างข้อมูลในช่อง input
        }

        try {
            const response = await fetch('/api/schedule/command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    psychologistEmail: user,
                    shifts: scheduleList.map(schedule => ({
                        availableDateStart: `${schedule.date}T${schedule.startTime.padStart(5, '0')}:00Z`,
                        availableDateEnd: `${schedule.date}T${schedule.endTime.padStart(5, '0')}:00Z`,
                    })),
                }),
            });

            if (response.ok) {
                console.log('Schedule created successfully');
            } else {
                console.error('Failed to create schedule');
            }
        } catch (error) {
            console.error('An error occurred while creating the schedule:', error);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="text-center py-10">
                <h1 className="font-akshar text-5xl text-[#2B6EB0]">Smiley Hours</h1>
                <p className="font-anuphan text-[#60AAF9] text-xl text-gray-600 mt-4">
                    เพิ่มตาราง เพื่อดูเเลใจคนไข้ของคุณ
                </p>
            </header>

            <div className="bg-[#D1E3F6] font-anuphan border border-gray-300 rounded-md shadow p-6">
                {scheduleList.map((schedule, index) => (
                    <div key={index} className="grid grid-cols-4 gap-64 mb-4">
                        <div className="w-80 col-span-1">
                            <label className="block text-[#2B6EB0] font-anuphan font-md text-lg mb-1">
                                วันที่ <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={schedule.date}
                                onChange={(e) =>
                                    handleInputChange(index, "date", e.target.value)
                                }
                                className={`w-full border ${errors[index]?.date ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
                            />
                        </div>
                        <div className="w-80 col-span-1">
                            <label className="block text-[#2B6EB0] font-anuphan font-md text-lg mb-1">
                                เวลาเริ่ม <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={schedule.startTime}
                                onChange={(e) =>
                                    handleInputChange(index, "startTime", e.target.value)
                                }
                                className={`w-full border ${errors[index]?.startTime ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
                            >
                                <option value="">--.--</option>
                                {availableTimes.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-80 col-span-1">
                            <label className="block text-[#2B6EB0] font-anuphan font-md text-lg mb-1">
                                เวลาสิ้นสุด <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={schedule.endTime}
                                onChange={(e) =>
                                    handleInputChange(index, "endTime", e.target.value)
                                }
                                className={`w-full border ${errors[index]?.endTime ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
                            >
                                <option value="">--.--</option>
                                {availableTimes.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1 flex items-end justify-center">
                            <button
                                type="button"
                                onClick={() => handleRemoveSchedule(index)}
                                className="flex items-center justify-center"
                            >
                                <Image src="/icon/delete.png" alt="delete" width={42} height={30} />
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddSchedule}
                    className="w-full font-anuphan bg-[#2B6EB0] text-white font-bold px-4 py-2 rounded-md hover:bg-gray-400 mb-4"
                >
                    เพิ่มตารางงาน
                </button>
            </div>
            <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#2B6EB0] flex justify-between text-white font-akshar px-6 py-2 rounded-md mt-4 hover:bg-gray-300 text-lg ml-auto"
            >
                Submit
            </button>

            <header className="text-left py-6">
                <h1 className="font-anuphan font-bold text-3xl text-[#2B6EB0]">ตารางงานของฉัน</h1>
            </header>

            <table className="w-full border border-gray-300 border-spacing-0 rounded-lg overflow-hidden border-separate table-fixed">
                <thead>
                    <tr>
                        <th className="border-r p-3 text-center text-lg font-anuphan text-white bg-[#2B6EB0] w-1/3"> วันที่</th>
                        <th className="border-r p-3 text-center text-lg font-anuphan text-white bg-[#2B6EB0] w-1/3">เวลาเริ่ม</th>
                        <th className="p-3 text-center text-lg font-anuphan text-white bg-[#2B6EB0] w-1/3">เวลาสิ้นสุด</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedSchedules.length > 0 ? (
                        submittedSchedules.map((schedule, index) => (
                            <tr key={index}>
                                <td className="border-r border-b border-gray-300 p-3 text-center w-1/3 font-akshar">
                                    {schedule.date ? dayjs(schedule.date).format("dddd, D MMMM YYYY") : "-"}
                                </td>
                                <td className="border-r border-b border-gray-300 p-3 text-center w-1/3 font-akshar">
                                    {schedule.startTime || "-"}
                                </td>
                                <td className="border-r border-b border-gray-300 p-3 text-center w-1/3 font-akshar">
                                    {schedule.endTime || "-"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="border-r border-gray-300 p-3 text-center w-1/3">-</td>
                            <td className="border-r border-gray-300 p-3 text-center w-1/3">-</td>
                            <td className="p-3 text-center w-1/3">-</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;
