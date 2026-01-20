import useGetPosts from "../../hooks/useGetPosts";
import { useUser } from "../../contexts/UserContext";
import PostCard from "../../components/postCard/PostCard";

const Home = () => {
    const { posts, loading, error, refetch } = useGetPosts({ page: 1, limit: 10 });
    // console.log(posts)
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-6 text-center">
                {user ? (
                    <h2 className="text-2xl font-semibold">Welcome back, {user.name}!</h2>
                ) : (
                    <h2 className="text-2xl font-semibold">Welcome to Discuss</h2>
                )}
                <p className="text-gray-600">Check out the latest posts below</p>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading posts...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-600">No posts available</p>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post, i) => (
                        <PostCard key={i} post={post} />
                    ))}
                </div>
            )}

            <div className="text-center mt-6">
                <button
                    onClick={refetch}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                >
                    Refresh Posts
                </button>
            </div>
        </div>
    );
};

export default Home;
