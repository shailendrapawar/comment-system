import { useEffect, useState } from "react";
import Comment from "../comment/Comment.jsx";
import AddComment from "../addComment/AddComment.jsx";
import api from "../../config/api.js";

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await api.get("/comments", {
          params: { postId, parentId: null },
          withCredentials: true,
        });

        setComments(res.data?.data?.items || []);
      } catch (err) {
        console.error("Failed to load comments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div className="mt-6 space-y-4">

      {/* addd comment=====  */}
      <AddComment
        postId={postId}
        onAdd={(newComment) =>
          setComments((prev) => [newComment, ...prev])
        }
      />

      {loading && <p className="text-gray-500">Loading comments...</p>}

      {!loading && comments.length === 0 && (
        <p className="text-gray-500">No comments yet</p>
      )}

      {/* call root comments========= */}
      {comments.map((c) => (
        <Comment
          key={c._id}
          comment={c}
          postId={postId}
          onDeleted={(id) =>
            setComments((prev) => prev.filter((x) => x._id !== id))
          }
        />
      ))}
    </div>
  );
};

export default CommentsList;
