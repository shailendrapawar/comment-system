import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        index: true
    },

    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    text: {
        type: String,
        required: true,
        trim: true
    },

    replyCount: {
        type: Number,
        default: 0
    },
    
    isDeleted: {
        type: Boolean,
        default: false,

    },

},
    {
        timestamps: true
    }
)

export default mongoose.model("Comment", commentSchema);