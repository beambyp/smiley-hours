import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { upload } from '@vercel/blob/client'

type PsychologistInfoData = {
    email: string,
    citizenID: string,
    name: string,
    surname: string,
    phoneNumber: string,
    gender: string,
    dateOfBirth: string,
    licenseNumber: string,
    address: string,
    workplace: string,
    specialization: string,
    isSpecializeAdult: boolean,
    isSpecializeChildAndTeen: boolean,
    isSpecializeElder: boolean,
    psychologistPhoto: string,
}

export default function PsychologistAccount() {
    const role = localStorage.getItem("role");
    const emailuser = localStorage.getItem("email");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [dateOfBirth, setBirth] = useState("")
    const [gender, setGender] = useState("")
    const [phoneNumber, setPhone] = useState("")
    const [citizenID, setCitizenID] = useState("")
    const [licenseNumber, setLicenseNumber] = useState("")
    const [address, setAddress] = useState("")
    const [workplace, setWorkplace] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [isSpecializeAdult, setIsSpecializeAdult] = useState(false)
    const [isSpecializeChildAndTeen, setIsSpecializeChildAndTeen] = useState(false)
    const [isSpecializeElder, setIsSpecializeElder] = useState(false)
    const [email, setEmail] = useState("")
    const [oldPassword, setoldPassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [error, setError] = useState("")
    const [recordData, setRecordData] = useState<PsychologistInfoData>();
    const [blobUrl, setBlobUrl] = useState("")
    const router = useRouter()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // ตรวจสอบว่ามีไฟล์หรือไม่
        if (file) {
            const validTypes = ["image/png", "image/jpeg"];
            if (!validTypes.includes(file.type)) { // ตรวจสอบประเภทไฟล์
                setError("Only PNG and JPEG files are allowed.");
                setProfileImage(null);
                setPreviewImage(null);
                return;
            }
            setError(""); // ล้าง error
            setProfileImage(file); // ตั้งค่าไฟล์
            setPreviewImage(URL.createObjectURL(file)); // สร้าง URL เพื่อแสดงตัวอย่าง
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setPreviewImage(null);

        // รีเซ็ตค่าของ input file
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // ล้างค่า input file
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            console.log(error);
            return
        }

        console.log("Profile Image:", profileImage);
        console.log("Other Fields:", { name, surname, dateOfBirth });
        console.log(name)
        console.log(surname)
        console.log(dateOfBirth)

        if (profileImage) {
            try {
                const blob = await upload(profileImage.name, profileImage, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    onUploadProgress: () => {
                        // setProgress(progressEvent.percentage)
                    },
                });
                console.log("Uploaded file is available at:", blob.url);

                // Directly use blob.url in the fetch request
                const res = await fetch("/api/signup/psychologist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name, surname, dateOfBirth, gender, phoneNumber, citizenID, licenseNumber, address, workplace, specialization,
                        isSpecializeAdult, isSpecializeChildAndTeen, isSpecializeElder, email, oldPassword, newPassword, psychologistPhoto: blob.url // Use the URL directly
                    })
                });

                if (res.ok) {
                    router.push('/home');
                } else {
                    setError("Error registration");
                }
            } catch (error) {
                setError("Password and Confirm Password do not match.");
                console.log(error);
            }
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
                    setName(data.name);
                    setSurname(data.surname);
                    setBirth(data.dateOfBirth);
                    setGender(data.gender);
                    setPhone(data.phoneNumber);
                    setCitizenID(data.citizenID);
                    setLicenseNumber(data.licenseNumber);
                    setAddress(data.address);
                    setWorkplace(data.workplace);
                    setSpecialization(data.specialization);
                    setIsSpecializeAdult(data.isSpecializeAdult);
                    setIsSpecializeChildAndTeen(data.isSpecializeChildAndTeen);
                    setIsSpecializeElder(data.isSpecializeElder);
                    setEmail(data.email);
                    setProfileImage(data.psychologistPhoto);
                }
            } catch (error) {
                console.error("Error fetching account info:", error);
            }
        }
        fetchAccountInfo();
    }, [emailuser, role]);

    console.log(recordData)
    return (
        <div className="comtainer flex p-2 flex-col gap-2 ">
            <h2 className="font-akshar text-2xl md:text-3xl text-[#2B6EB0] md:mb-2">Psychologist Account Preferences</h2>
            <h2 className="font-anuphan text-xl md:text-xl text-[#2B6EB0] md:mb-2">ตั้งค่าข้อมูลส่วนตัว</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 flex items-center gap-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="profileImage"
                            className="block text-sm font-medium text-[#2B6EB0] mb-2"
                        >
                            รูปโปรไฟล์ (PNG, JPEG เท่านั้น) <span className="font-anuphan text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            ref={fileInputRef} //useRef for file input
                            className="block text-sm text-[#2B6EB0] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#2B6EB0] hover:file:bg-blue-100"
                            onChange={handleImageChange}
                        />
                    </div>
                    {(profileImage || recordData?.psychologistPhoto) && (
                        <div className="relative">
                            <img
                                src={
                                    previewImage || recordData?.psychologistPhoto || "/default-image.png"
                                }
                                alt="Profile Preview"
                                className="w-[4.5rem] h-[4.5rem] rounded-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-700"
                                title="ลบรูป"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>
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
                        Email <span className="font-anuphan text-red-500">*</span>
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
                        เลขบัตรประขาชน <span className="font-anuphan text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={citizenID}
                        placeholder="Enter your citizenID"
                        className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setCitizenID(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#2B6EB0]">
                        เลขใบประกอบการ <span className="font-anuphan text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={licenseNumber}
                        placeholder="Enter your license number"
                        className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2B6EB0]">
                        ที่ทำงาน <span className="font-anuphan text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={workplace}
                        placeholder="Enter your workplace"
                        className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setWorkplace(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#2B6EB0]">
                        Specialization <span className="font-akshar text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={specialization}
                        placeholder="Enter your specialization"
                        className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2B6EB0]">
                        ที่อยู่ <span className="font-anuphan text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={address}
                        placeholder="Enter your address"
                        className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <div className="flex justify-between">
                        <label className="block text-[#2B6EB0] text-lg">สาขาที่เชี่ยวชาญ</label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" checked={isSpecializeChildAndTeen || false} onChange={(e) => setIsSpecializeChildAndTeen(e.target.checked)} className="w-4 h-4 text-blue-600" />
                            <span>เด็กและวัยรุ่น</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" checked={isSpecializeAdult || false} onChange={(e) => setIsSpecializeAdult(e.target.checked)} className="w-4 h-4 text-blue-600" />
                            <span>ผู้ใหญ่</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" checked={isSpecializeElder || false} onChange={(e) => setIsSpecializeElder(e.target.checked)} className="w-4 h-4 text-blue-600" />
                            <span>สูงอายุ</span>
                        </label>
                    </div>
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

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="font-akshar w-full bg-[#2B6EB0] text-white py-2 rounded hover:bg-blue-800"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'red', font: 'akshar' }}>{error}</p>}
        </div>
    );
};



