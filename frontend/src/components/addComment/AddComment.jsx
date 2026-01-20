import { useState } from "react";
import api from "../../config/api.js";
import { useUser } from "../../contexts/UserContext.jsx";

const AddComment = ({ postId, onAdd }) => {
    const data = useUser();
    const [user] = useState(data.user.user)
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    // not logged in return
    if (!user?._id) {
        return (
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-500">
                Login to add a comment
            </div>
        );
    }

    const handleSubmit = async () => {
        if (!text.trim()) return;

        try {
            setLoading(true);
            const res = await api.post(
                "/comments",
                {
                    postId,
                    text, // parentId = null
                },
                { withCredentials: true }
            );

            setText("");

            // console.log(res.data.data)
            if (onAdd) onAdd(res.data.data || res.data);
        } catch (err) {
            console.error("Failed to add comment", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-full bg-gray-800 text-white flex items-center justify-center">
                    {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <p className="text-sm text-gray-600">{user.name}</p>
            </div>

            <textarea
                className="w-full border rounded-md p-2 text-gray-700"
                rows={3}
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex justify-end mt-2">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>
        </div>
    );
};

export default AddComment;
