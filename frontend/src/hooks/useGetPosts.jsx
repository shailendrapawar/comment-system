
import { useEffect, useState, useCallback } from "react";
import api from "../config/api.js";

const useGetPosts = (params = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await api.get("/posts", {
                params,
                withCredentials: true,
                //  signal: controller.signal 
            });
            // console.log(res.data.data.items)
            setPosts(res.data.data.items?? []);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);


    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return {
        posts,
        loading,
        error,
        refetch: fetchPosts,
    };
}
export default useGetPosts