import { useState } from "react";

export default function UserForm(){
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [birth,setBirth] = useState("")
    const [gender,setGender] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("")
    const [error,setError] = useState("")
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(confirmPassword != password){
            setError("Password and Confirm Password do not match.")
            console.log(error)
        }

        console.log(name)
        console.log(surname)
        try {
          const res = await fetch("http://localhost:3000/api/signup",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              },
            body: JSON.stringify({
              name,surname,birth,gender,phone,email,password
            })
          })
          if(res.ok){
            setError("")
            //e.target.reset(); // Reset form
          }
        } catch (error) {
          setError("Password and Confirm Password do not match.")
          console.log(error)
        }
    }

    return(
        <div>
            <h2 className= "font-akshar text-2xl md:text-3xl text-blue-800 mb-4 md:mb-6 ">Create Account</h2>
            <p className="font-anuphan text-sm text-gray-500 mb-6">ผู้ต้องการคำปรึกษา</p>
            <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
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
              <label className="block text-sm font-medium text-gray-700">
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
              <label className="block text-sm font-medium text-gray-700">
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
              <label className="block text-sm font-medium text-gray-700">
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
              <label className="block text-sm font-medium text-gray-700">
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
              <label className="block text-sm font-medium text-gray-700">
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
              <label className="block text-sm font-medium text-gray-700">
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
              <label className="block text-sm font-medium text-gray-700">
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
          <button
            type="submit"
            className="font-akshar mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        </div>
    );
}

