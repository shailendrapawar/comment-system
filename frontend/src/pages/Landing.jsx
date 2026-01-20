import { useNavigate } from "react-router-dom"
const Landing = () => {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">

            <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
                <h1 className="text-lg font-semibold">Discuss</h1>
                <div className="space-x-4">
                    <button className="text-sm text-gray-600 hover:text-gray-800"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                    <button className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                </div>
            </nav>


            <section className="max-w-5xl mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Meaningful Discussions,
                    <span className="block text-gray-600">One Thread at a Time</span>
                </h2>

                <p className="text-gray-600 max-w-xl mx-auto mb-8">
                    A simple platform to share thoughts, reply deeply, and build
                    conversations without noise.
                </p>

                <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                    onClick={()=>navigate("/register")}
                    >
                        Join Now
                    </button>
                    <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-200">
                        Explore
                    </button>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="max-w-5xl mx-auto px-6 grid gap-8 md:grid-cols-3">
                    {[
                        {
                            title: "Nested Replies",
                            desc: "Reply at any depth and keep discussions structured.",
                        },
                        {
                            title: "Fast & Minimal",
                            desc: "Optimized rendering for smooth typing and reading.",
                        },
                        {
                            title: "Community Focused",
                            desc: "Designed for thoughtful conversations, not noise.",
                        },
                    ].map((f) => (
                        <div
                            key={f.title}
                            className="p-6 border rounded-xl text-center"
                        >
                            <h3 className="font-semibold mb-2">{f.title}</h3>
                            <p className="text-sm text-gray-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            <section className="py-20 text-center">
                <h3 className="text-2xl font-semibold mb-4">
                    Start a Discussion Today
                </h3>
                <p className="text-gray-600 mb-6">
                    Sign up and be part of meaningful conversations.
                </p>
            </section>

        </div>
    );
};

export default Landing;
