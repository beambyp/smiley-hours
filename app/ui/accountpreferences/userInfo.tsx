import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

type UserInfoData = {
    email: string;
    name: string;
    surname: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
}
export default function UserAccount() {
    const role = localStorage.getItem("role");
    const emailuser = localStorage.getItem("email");
    const [recordData, setRecordData] = useState<UserInfoData>();
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [dateOfBirth, setBirth] = useState("")
    const [gender, setGender] = useState("")
    const [phoneNumber, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [oldPassword, setoldPassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const router = useRouter()
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            console.log(error);
            return
        } 
        console.log("Other Fields:", { name, surname, dateOfBirth });
        try {
            const res = await fetch("/api/profile/command/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, surname, dateOfBirth, gender, phoneNumber, email, oldPassword, newPassword
                })
            })
            if (res.ok) {
                router.push('/home')
            }
            else {
                setError("Error registeration")
            }
        } catch (error) {
            setError("Password and Confirm Password do not match.")
            console.log(error)
        }
    }

    useEffect(() => {
        async function fetchAccountInfo() {
            try {
                const baseApi = "/api/profile/query";
                const response = await fetch(baseApi, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: emailuser,
                        role: role,
                    }),
            });
            const data = await response.json();
            if (data) {
                setRecordData(data);
                setEmail(data.email);
                setName(data.name);
                setSurname(data.surname);
                setGender(data.gender);
                setBirth(data.dateOfBirth);
                setPhone(data.phoneNumber);
            }
        } catch (error) {
            console.error("Error fetching account info:", error);
        }
        }
        fetchAccountInfo();
    }, [emailuser, role]);

    console.log(recordData)
    console.log(oldPassword)
    return (
        <div className="comtainer flex p-10 flex-col gap-2 ">
            <h2 className="font-akshar text-2xl md:text-3xl text-[#2B6EB0] md:mb-2">User Account Preferences</h2>
            <p className="font-anuphan text-xl md:text-xl text-[#2B6EB0] md:mb-2">ตั้งค่าข้อมูลส่วนตัว</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#2B6EB0]">
                            ชื่อ <span className="font-anuphan text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2B6EB0]">
                            นามสกุล <span className="font-anuphan text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={surname}
                            placeholder="Enter your surname"
                            className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2B6EB0]">
                            วันเกิด <span className="font-anuphan text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            value={dateOfBirth}
                            className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setBirth(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2B6EB0]">
                            เพศ <span className="font-anuphan text-red-500">*</span>
                        </label>
                        <select
                            className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            required
                        >
                            <option value="" disabled>
                                Select your gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2B6EB0]">
                            เบอร์โทร <span className="font-anuphan text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            placeholder="Enter your phone"
                            className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2B6EB0]">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2B6EB0]">
                            รหัสผ่านเดิม <span className="font-anuphan text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setoldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2B6EB0]">
                            รหัสผ่านใหม่ <span className="font-anuphan text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setnewPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="font-akshar mt-4 w-full bg-[#2B6EB0] text-white font-xl py-2 rounded-md hover:bg-gray-400 transition"
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

