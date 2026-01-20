import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/api.js";
import PostCard from "../../components/postCard/PostCard.jsx";
import toast from "react-hot-toast";
import CommentsList from "../../components/commentList/CommentList.jsx";

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPost = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/posts/${id}`, { withCredentials: true });
            // setPost(res.data);
            // console.log(res?.data?.data)
            setPost(res?.data?.data)
            toast.success("Resource found")
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to fetch post");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                Loading post...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                Post not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-3xl mx-auto">
                <PostCard post={post} />

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Comments</h2>
                    {post && <CommentsList postId={post._id} />}

                </div>
            </div>
        </div>
    );
};

export default SinglePost;
