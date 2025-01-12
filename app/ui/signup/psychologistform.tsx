import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function PsychologistForm(){
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [dateOfBirth,setBirth] = useState("")
    const [gender,setGender] = useState("")
    const [phoneNumber,setPhone] = useState("")
    const [citizenID,setCitizenID] = useState("")
    const [licenseNumber,setLicenseNumber] = useState("")
    const [address,setAddress] = useState("")
    const [workplace,setWorkplace] = useState("")
    const [specialization,setSpecialization] = useState("")
    const [isSpecializeAdult,setIsSpecializeAdult] = useState(false)
    const [isSpecializeChildAndTeen,setIsSpecializeChildAndTeen] = useState(false)
    const [isSpecializeElder,setIsSpecializeElder] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("")
    const [error,setError] = useState("")
    
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(confirmPassword != password){
            setError("Password and Confirm Password do not match.")
            console.log(error)
        }

        console.log(name)
        console.log(surname)
        console.log(dateOfBirth)
        try {
          const res = await fetch("/api/signup/psychologist",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              },
            body: JSON.stringify({
              name,surname,dateOfBirth,gender,phoneNumber,citizenID,licenseNumber,address,workplace,specialization,isSpecializeAdult,isSpecializeChildAndTeen,isSpecializeElder,email,password
            })
          })
          if(res.ok){
            router.push('/signin')
          }
          else{
            setError("Error registeration")
          }
        } catch (error) {
          setError("Password and Confirm Password do not match.")
          console.log(error)
        }
    }

    return(
        <div className="p-2">
        <h2 className= "font-akshar text-2xl md:text-3xl text-[#2B6EB0] mt-10 md:mb-4 ">Create Account</h2>
        <p className="font-anuphan text-xl text-[#2B6EB0] mb-6">ผู้ให้คำปรึกษา</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2B6EB0]">
                ชื่อ <span className="font-anuphan text-red-500">*</span>
              </label>
              <input
                type="text"
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
                className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setBirth(e.target.value)}
                required
              />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2B6EB0]">
                เพศ <span className="font-anuphan text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your gender"
                className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setGender(e.target.value)}
                required
              />
          </div>

          <div>
          <label className="block text-sm font-medium text-[#2B6EB0]">
                เบอร์โทร <span className="font-anuphan text-red-500">*</span>
              </label>
              <input
                type="tel"
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
                placeholder="Enter your email"
                className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2B6EB0]">
                เลขบัตรประขาชน <span className="font-anuphan text-red-500">*</span>
              </label>
              <input
                type="text"
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
                <input type="checkbox" onChange={(e) => setIsSpecializeChildAndTeen(e.target.checked)}className="w-4 h-4 text-blue-600" />
                <span>เด็กและวัยรุ่น</span>
              </label>
              <label className="flex items-center space-x-1">
              <input type="checkbox" onChange={(e) => setIsSpecializeAdult(e.target.checked)}className="w-4 h-4 text-blue-600" />
                <span>ผู้ใหญ่</span>
              </label>
              <label className="flex items-center space-x-1">
              <input type="checkbox" onChange={(e) => setIsSpecializeElder(e.target.checked)}className="w-4 h-4 text-blue-600" />
                <span>สูงอายุ</span>
              </label>
            </div>
          </div>

          <div>
          <label className="block text-sm font-medium text-[#2B6EB0]">
                รหัสผ่าน <span className="font-anuphan text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>
          <div>
          <label className="block text-sm font-medium text-[#2B6EB0]">
                ยืนยันรหัสผ่าน <span className="font-anuphan text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="font-akshar mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#2B6EB0] text-white py-2 rounded hover:bg-blue-800"
            >
              Sign Up
            </button>
          </div>
        </form>
        {error && <p style={{ color: 'red', font:'akshar'}}>{error}</p>}
        </div>
    );
};