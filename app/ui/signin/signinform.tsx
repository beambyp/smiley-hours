import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInForm(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const router = useRouter()
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const res = await signIn('credentials',{
            redirect: false,
            email,
            password
        })
        if(res?.error){
            console.log(res.error)
            return false
        }
        router.push('/home')
    }
    console.log(email)
    console.log(password)
    return(
        <div>
            <h2 className= "font-akshar text-2xl md:text-3xl text-[#2B6EB0] mb-4 md:mb-6 ">Sign In</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="font-akshar block text-[#2B6EB0] font-medium mb-2" htmlFor="email">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your Email"
                                className="font-akshar w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="font-akshar block text-[#2B6EB0] font-medium mb-2" htmlFor="password">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your Password"
                                className="font-akshar w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="font-akshar ml-2 text-[#2B6EB0]">Remember me</span>
                            </label>
                            <a href="#" className="font-akshar text-grey-800 hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="font-akshar w-full bg-[#2B6EB0] hover:bg-blue-700 text-white py-3 rounded-md font-medium transition duration-150"
                        >
                            Sign In
                        </button>
                    </form>
                    <p className="font-akshar text-center text-sm mt-4">
                        don’t have an account?{" "}
                        <a href="/signup" className="font-akshar text-[#2B6EB0] hover:underline">
                            create account
                    </a>
                    </p>
        </div>
    );
}

