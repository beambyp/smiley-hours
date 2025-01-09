import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CreateForm: React.FC = () => {
    const { data: session } = useSession();
    const user = session?.user.email;
    const [userEmail, setUserEmail] = useState<string[]>([]);
    // const [errors, setErrors] = useState<{ userEmail: boolean; Date: boolean; Time: boolean }[]>([
    //     { userEmail: false, Date: false, Time: false },
    // ]);

    const availableTimes = Array.from({ length: 24 }, (_, hour) => {
        const formattedHour = hour.toString().padStart(2, "0");
        return [`${formattedHour}:00`, `${formattedHour}:30`];
    }).flat();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/appointment/query', {
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
                    setUserEmail(data);
                } else {
                    console.error('Failed to get schedule information');
                }
            } catch (error) {
                console.error('An error occurred while getting the schedule:', error);
            }
        };
        fetchUser();
    }, [user]);

    const [selectedEmail, setSelectedEmail] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    console.log(selectedDate)
    console.log(selectedEmail)
    console.log(selectedTime)
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/appointment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: selectedEmail,
                    psychologistEmail: user,
                    role: "Psychologist",
                    appointmentDate: `${selectedDate}T${selectedTime.padStart(5, '0')}:00Z`,
                    symptom: "ติดตามอาการ",
                }),
            });

            if (response.ok) {
                console.log('Schedule created successfully');
                setSelectedEmail("")
                setSelectedDate("")
                setSelectedTime("")
            } else {
                console.error('Failed to create schedule');
            }
        } catch (error) {
            console.error('An error occurred while creating the schedule:', error);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="bg-[#D1E3F6] font-anuphan border border-gray-300 rounded-md shadow p-6">
                <div className="grid grid-cols-3 gap-6 mb-4">
                    <div className="w-84 col-span-1">
                        <label className="block text-[#2B6EB0] font-anuphan font-md text-lg mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={selectedEmail}
                            onChange={(e) => setSelectedEmail(e.target.value)}
                            className={`w-full border rounded-md p-2`}
                        >
                            <option value="" disabled>Select an email</option>
                            {userEmail.map((email, index) => (
                                <option key={index} value={email}>
                                    {email}
                                </option>))}
                        </select>
                    </div>
                    <div className="w-84 col-span-1">
                        <label className="block text-[#2B6EB0] font-anuphan font-md text-lg mb-1">
                            วันที่ <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className={`w-full border rounded-md p-2`}
                        />
                    </div>
                    <div className="w-84 col-span-1">
                        <label className="block text-[#2B6EB0] font-anuphan font-md text-lg mb-1">
                            เวลา <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className={`w-full border rounded-md p-2`}
                        >
                            <option value="">--.--</option>
                            {availableTimes.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#2B6EB0] flex justify-between text-white font-akshar px-6 py-2 rounded-md mt-4 hover:bg-gray-300 text-lg ml-auto"
            >
                Submit
            </button>
        </div>
    );
};

export default CreateForm;
