import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { toast } from "react-hot-toast"

import API from "../../config/api.js"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../contexts/UserContext.jsx";


const Login = () => {

    const { theme } = useTheme()
    const { login } = useUser()
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) {
            return
        }

        setLoading(true);

        if (email == "" || password == "") {
            toast.error("All fields are mandatory")
            return
        }

        try {
            const result = await API.post("/users/login", {
                email, password
            })
            const user = result?.data?.data || null

            if (!user) {
                throw new Error("User not found");
            }

            toast.success('User logged in')
            login(user)

            setTimeout(() => {
                navigate("/home")
            }, 1000);
        } catch (error) {
            // console.log(error?.response?.data?.message)
            toast.error(error?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-6 rounded-xl shadow"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Login
                </h2>

                <div className="mb-3 "
                    style={{
                        borderBottom: `2px solid ${theme.border}`
                    }}
                >
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-md outline-none"
                        placeholder={"Enter email"}
                    />
                </div>

                <div className="mb-4"
                    style={{
                        borderBottom: `2px solid ${theme.border}`
                    }}
                >
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-md outline-none "
                        placeholder={"Enter password"}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
