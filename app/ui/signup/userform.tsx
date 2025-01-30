import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function UserForm() {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [dateOfBirth, setBirth] = useState("")
  const [gender, setGender] = useState("")
  const [phoneNumber, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      console.log(error);
      return
    } else if (confirmPassword !== password) {
      setError("Password and Confirm Password do not match.");
      console.log(error);
      return
    } else {
      setError("");
      console.log("Passwords are valid and match.");
    }

    console.log(name)
    console.log(surname)
    console.log(dateOfBirth)
    try {
      const res = await fetch("/api/signup/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, surname, dateOfBirth, gender, phoneNumber, email, password
        })
      })
      if (res.ok) {
        router.push('/signin')
      }
      else {
        setError("Error registeration")
      }
    } catch (error) {
      setError("Password and Confirm Password do not match.")
      console.log(error)
    }
  }

  return (
    <div>
      <h2 className="font-akshar text-2xl md:text-3xl text-[#2B6EB0] mb-2 md:mb-6 ">Create Account</h2>
      <p className="font-anuphan text-xl text-[#2B6EB0] mb-6">ผู้ต้องการคำปรึกษา</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <p className="font-anuphan text-sm text-[#2B6EB0]">
          Smiley Hours ให้ความสำคัญสูงสุดกับความปลอดภัยของข้อมูลผู้ใช้งาน <br />
          และรับประกันว่าข้อมูลของท่านจะถูกเก็บเป็นความลับ ไม่ถูกเปิดเผยแก่บุคคลภายนอก
        </p>
        <button
          type="submit"
          className="font-akshar mt-4 w-full bg-[#2B6EB0] text-white font-semibold py-2 rounded-md hover:bg-gray-400 transition"
        >
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

