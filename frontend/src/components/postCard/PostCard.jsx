import { useNavigate } from "react-router-dom"
const PostCard = ({ post }) => {
    const {
        authorId,
        content,
        createdAt,
        commentCount,
        likeCount,
        postImage,
    } = post;

    const navigate = useNavigate()

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 max-w-xl mx-auto my-4">
            {postImage && (
                <img
                    src={postImage}
                    alt="Post"
                    className="w-full h-64 object-cover"
                />
            )}

            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold text-lg">
                        {authorId?.name?.toUpperCase()} 
                    </span>
                    <span className="text-gray-400 text-sm">
                        {new Date(createdAt).toLocaleDateString()}
                    </span>
                </div>


                <p className="text-gray-800 mb-4">{content}</p>

                <div className="flex items-center justify-between text-gray-500 text-sm">
                    <div className="flex items-center space-x-2">
                        <span>❤️ {likeCount}</span>
                        <span>💬 {commentCount}</span>
                    </div>
                    <button className="text-blue-500 hover:underline text-sm cursor-pointer"
                        onClick={() => navigate(`/posts/${post?._id}`)}
                    >
                        View Comments
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
