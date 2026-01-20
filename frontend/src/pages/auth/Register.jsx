import { useState } from "react";
import { toast } from "react-hot-toast"
import API from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
const Register = () => {

    const { theme } = useTheme();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.email == "" || form.password == "" || form.name == "") {
            toast.error("All fields are required")
            return
        }

        if (loading) return


        setLoading(true);

        try {
            const result = await API.post("/users/register", {
                name: form.name,
                email: form.email,
                password: form.password
            })
            const user = result?.data?.data || null

            console.log(user)

            toast.success('User registered')


            setTimeout(() => {
                navigate("/login")
            }, 1000);
        } catch (error) {
            // console.log(error?.response?.data?.message)
            console.log(error)
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
                    Create Account
                </h2>

                <div className="mb-3 mt-6"
                    style={{
                        borderBottom: `2px solid ${theme.border}`
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2  rounded-md outline-none "
                    />
                </div>

                <div className="mb-3"
                    style={{
                        borderBottom: `2px solid ${theme.border}`
                    }}
                >

                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-md  outline-none"
                    />
                </div>

                <div className="mb-4"
                    style={{
                        borderBottom: `2px solid ${theme.border}`
                    }}
                >

                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Enter password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2  rounded-md  outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Register"}
                </button>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <span className="text-gray-800 font-medium cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
