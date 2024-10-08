import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
    {
        likes: [
            {
                userId: String,
                problemId: String,
                commentId: String,
                liked: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        dislikes: [
            {
                userId: String,
                problemId: String,
                commentId: String,
                disliked: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
    { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);

const likeSchema = new mongoose.Schema({
    userId: String,
    problemId: String,
    commentId: String,
    liked: {
        type: Boolean,
        default: false,
    },
});

const Like = mongoose.model("Like", likeSchema);

// const dislikeSchema = new mongoose.Schema({}, { timestamps: true });

// const Dislike = mongoose.model("Dislike", dislikeSchema);

export { Status, Like };
