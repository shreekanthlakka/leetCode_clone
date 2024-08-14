import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
        },
        comment: {
            type: String,
        },
        replayTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentsSchema);

export default Comment;
