import { useState } from "react";
import { toast } from "react-hot-toast"
import API from "../../config/api";
import { useNavigate } from "react-router-dom";
const Register = () => {
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

                {/* Name */}
                <div className="mb-3">
                    <label className="block text-sm text-gray-600 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="block text-sm text-gray-600 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
                    <span className="text-gray-800 font-medium cursor-pointer hover:underline">
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
