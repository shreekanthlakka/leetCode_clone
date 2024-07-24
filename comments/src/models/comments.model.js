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
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentsSchema);

export default Comment;
