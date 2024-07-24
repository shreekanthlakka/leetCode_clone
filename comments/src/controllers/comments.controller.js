import Comment from "../models/comments.model.js";
import { asyncHandler } from "@shreekanthlakka/common";
import { CustomError, CustomResponse } from "@shreekanthlakka/common";

const createComment = asyncHandler(async (req, res) => {
    const { comment } = req.body;
    const commentsObj = await Comment.create({
        comment,
        userId: req.user._id,
        problemId: req.params.problemId,
    });
    if (!commentsObj) {
        throw new CustomError(400, "Unable to create comment");
    }
    const comm = await Comment.findById(commentsObj._id)
        .populate("userId")
        .populate("problemId");
    res.status(200).json(
        new CustomResponse(200, "Comment created successfully", comm)
    );
});

const getAllComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find({})
        .populate("problemId")
        .populate("userId");
    if (!comments) {
        throw new CustomError(400, "Unable to get comments");
    }
    res.status(200).json(
        new CustomResponse(200, "Comments fetched successfully", comments)
    );
});

const getCommentsByProblemId = asyncHandler(async (req, res) => {
    const comments = await Comment.find({
        problemId: req.params.problemId,
    })
        .populate("userId")
        .populate("problemId");
    if (!comments) {
        throw new CustomError(400, "Unable to get comments");
    }
    res.status(200).json(
        new CustomResponse(200, "Comments fetched successfully", comments)
    );
});

const deleteCommentByProblemId = asyncHandler(async (req, res) => {
    const comment = await Comment.find({
        problemId: req.params.problemId,
        userId: req.user._id,
        _id: req.params.commentId,
    });
    if (!comment) {
        throw new CustomError(
            400,
            "comment not found / not authorized to delete the comment"
        );
    }
    const delcomment = await Comment.findByIdAndDelete(comment._id);
    if (!delcomment) {
        throw new CustomError(400, "Unable to delete comment");
    }
    res.status(200).json(
        new CustomResponse(200, "Comment deleted successfully", delcomment)
    );
});

const updateCommentByProblemId = asyncHandler(async (req, res) => {
    const comment = await Comment.find({
        problemId: req.params.problemId,
        userId: req.user._id,
        _id: req.params.commentId,
    });
    if (!comment) {
        throw new CustomError(
            400,
            "no comment found / not authorized to update the comment"
        );
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        comment._id,
        { comment: req.body.comment },
        { new: true }
    );
    if (!updatedComment) {
        throw new CustomError(400, "Unable to update comment");
    }
    res.status(200).json(
        new CustomResponse(200, "Comment updated successfully", updatedComment)
    );
});

export {
    createComment,
    getAllComments,
    getCommentsByProblemId,
    deleteCommentByProblemId,
    updateCommentByProblemId,
};
