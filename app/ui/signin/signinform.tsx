import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("")
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            console.log(res.error);
            setError("Invalid Email or Password")
            return false;
        }
        const session = await getSession();
        if (session?.user) {
            if (session.user.email) {
                localStorage.setItem("email", session.user.email);
            }
            if (session.user.Role) {
                localStorage.setItem("role", session.user.Role);
            }
        }

        router.push("/home");
    };

    return (
        <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="font-akshar text-xl md:text-3xl text-[#2B6EB0] mb-4 md:mb-6 text-center">
                Sign In
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                {/* Email Field */}
                <div>
                    <label
                        className="font-akshar block text-[#2B6EB0] font-medium mb-2"
                        htmlFor="email"
                    >
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your Email"
                        className="font-akshar w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label
                        className="font-akshar block text-[#2B6EB0] font-medium mb-2"
                        htmlFor="password"
                    >
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your Password"
                        className="font-akshar w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 focus:ring focus:ring-blue-200"
                        />
                        <span className="font-akshar ml-2 text-[#2B6EB0]">
                            Remember me
                        </span>
                    </label>
                    <a
                        href="#"
                        className="font-akshar text-gray-600 hover:text-blue-500 hover:underline"
                    >
                        Forgot Password?
                    </a>
                </div>

                {/* Sign In Button */}
                <button
                    type="submit"
                    className="font-akshar w-full bg-[#2B6EB0] hover:bg-gray-400 text-white py-3 rounded-md font-medium transition duration-150"
                >
                    Sign In
                </button>
            </form>

            {/* Footer */}
            <p className="font-akshar text-center text-sm mt-6 text-gray-600">
                Don’t have an account?{" "}
                <a
                    href="/signup"
                    className="font-akshar text-[#2B6EB0] hover:underline"
                >
                    Create Account
                </a>
            </p>
            {error && <p style={{ color: 'red'}}>{error}</p>}
        </div>
    );
}
