import { useState, memo, useCallback } from "react";
import api from "../../config/api.js";
import { useUser } from "../../contexts/UserContext.jsx";

const Comment = memo(({ comment, postId, onDeleted }) => {
  const data = useUser()

  const [user] = useState(data.user.user || {})
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const isAuthor =
    user?._id && comment.authorId?._id === user._id;

  // console.log("user", user.user)
  // console.log("commetn", comment)

  // dlete comment
  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await api.put(`/comments/${comment._id}`, {
        isDeleted: true
      }, {
        withCredentials: true,
      });

      // notify parent to remove this comment
      if (onDeleted) onDeleted(comment._id);
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };


  //reply handle======================
  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      const res = await api.post(
        "/comments",
        {
          postId,
          parentId: comment._id,
          text: replyText,
        },
        { withCredentials: true }
      );

      setReplies((prev) => [...prev, res.data.data || res.data]);
      setReplyText("");
      setShowReplyBox(false);
      setShowReplies(true);
    } catch (err) {
      console.error("Failed to add reply", err);
    }
  };


  //toggle reply =======
  const toggleReplies = useCallback(async () => {
    if (showReplies) {
      setShowReplies(false);
      return;
    }

    if (replies.length > 0) {
      setShowReplies(true);
      return;
    }

    try {
      setLoadingReplies(true);
      const res = await api.get("/comments", {
        params: {
          postId,
          parentId: comment._id,
        },
        withCredentials: true,
      });

      setReplies(res.data?.data?.items || []);
      setShowReplies(true);
    } catch (err) {
      console.error("Failed to load replies", err);
    } finally {
      setLoadingReplies(false);
    }
  }, [postId, comment._id, showReplies, replies.length]);

  return (
    <div className="ml-0 md:ml-4 border-l border-gray-200 pl-4 mt-4">
      <div className="bg-white p-3 rounded-md shadow-sm">

        {/* iff author then visible */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-800 text-white flex items-center justify-center">
              {comment.authorId?.name?.charAt(0)?.toUpperCase()}
            </div>
            <p className="text-gray-500 text-sm">
              {comment.authorId?.name}
            </p>
          </div>

          {isAuthor && (
            <button
              onClick={handleDelete}
              className="text-red-500 text-xs hover:underline"
            >
              Delete
            </button>
          )}
        </div>

        <p className="text-gray-800 pl-5 mt-2">{comment.text}</p>

        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setShowReplyBox((p) => !p)}
          >
            Reply
          </button>

          {comment.replyCount > 0 && (
            <button
              className="text-blue-500 hover:underline"
              onClick={toggleReplies}
              disabled={loadingReplies}
            >
              {loadingReplies
                ? "Loading..."
                : showReplies
                  ? "Hide replies"
                  : `View replies (${comment.replyCount})`}
            </button>
          )}
        </div>

        {/* reply comment  */}
        {showReplyBox && (
          <div className="mt-2">
            <textarea
              className="w-full border rounded-md p-2 text-gray-700"
              rows={2}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
            />
            <button
              className="mt-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleReply}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/*child comment replies */}
      {showReplies &&
        replies.map((r) => (
          <Comment
            key={r._id}
            comment={r}
            postId={postId}
            onDeleted={(id) =>
              setReplies((prev) => prev.filter((x) => x._id !== id))
            }
          />
        ))}
    </div>
  );
});

export default Comment;
