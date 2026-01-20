import { useState } from "react";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            console.log(form);
            setLoading(false);
        }, 800);
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
