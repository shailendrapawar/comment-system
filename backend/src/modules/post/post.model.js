import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        postImage: {
            type: "String",
            default: "https://imgs.search.brave.com/iy9g0w1kSR52Q6Hio1kmgvZpaUaI0Y8TbTmSdZYAC_w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/aWNvbnM4LmNvbS9j/bG91ZHMvMTIwMC9z/aHVmZmxlLmpwZw"
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        likeCount: {
            type: Number,
            default: 0
        },

        commentCount: {
            type: Number,
            default: 0
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Post", postSchema);
