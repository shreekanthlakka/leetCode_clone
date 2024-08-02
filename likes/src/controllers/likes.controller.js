import {
    asyncHandler,
    CustomError,
    CustomResponse,
} from "@shreekanthlakka/common";

import { Status, Like } from "../models/likes.model.js";

const toggleLike = asyncHandler(async (req, res) => {
    const { problemId, commentId } = req.params;
    const { liked, unliked } = req.body;
    const likedObj = await Like.create({
        likes: {
            userId: req.user._id,
            problemId,
            commentId,
            liked: liked === "true" ? true : false,
        },
        dislikes: {
            userId: req.user._id,
            problemId,
            commentId,
            disliked: unliked === "true" ? true : false,
        },
    });
    if (!likedObj) {
        throw new CustomError(400, "Failed to toggle like");
    }
    res.status(200).json(new CustomResponse(200, "status"));
});

const toggleDislike = asyncHandler(async (req, res) => {});

const statusController2 = asyncHandler(async (req, res) => {
    console.log("in status controller  ");
    const { problemId, commentId } = req.params;
    const userId = req.user._id;
    const { status } = req.body;
    const likedObj = {
        liked: true,
        problemId,
        commentId,
        userId,
    };
    const dislikedObj = {
        disliked: true,
        problemId,
        commentId,
        userId,
    };

    let userStatus = await Status.findOne({
        "likes.userId": userId,
        "likes.commentId": commentId,
        "likes.problemId": problemId,
    });

    if (userStatus.likes.liked || userStatus.dislikes.disliked) {
        //toggle the like/diskike button
    }

    if (!userStatus) {
        userStatus = await Status.findOne({
            "dislikes.userId": userId,
            "dislikes.commentId": commentId,
            "dislikes.problemId": problemId,
        });
    }

    if (!userStatus) {
        userStatus = new Status();
    }

    switch (status) {
        case "liked":
            userStatus.likes = [...userStatus.likes, likedObj];

            // Remove from dislikes if it exists
            userStatus.dislikes = userStatus.dislikes.filter(
                (dislike) =>
                    !(
                        dislike.userId === userId &&
                        dislike.commentId === commentId &&
                        dislike.problemId === problemId
                    )
            );
            break;
        case "disliked":
            userStatus.dislikes = [...userStatus.dislikes, dislikedObj];

            // Remove from likes if it exists
            userStatus.likes = userStatus.likes.filter(
                (like) =>
                    !(
                        like.userId === userId &&
                        like.commentId === commentId &&
                        like.problemId === problemId
                    )
            );
            await statusDisliked.save();
            break;
    }
    await userStatus.save();

    const totalStatus = await Status.find({});
    const likesOnProblemIdCommentId = totalStatus.reduce((acc, curr) => {
        return acc.concat(
            curr.likes.filter(
                (like) =>
                    like.problemId === problemId && like.commentId === commentId
            )
        );
    }, []);

    const dislikesOnProblemIdCommentId = totalStatus.reduce((acc, curr) => {
        return acc.concat(
            curr.dislikes.filter(
                (dislike) =>
                    dislike.problemId === problemId &&
                    dislike.commentId === commentId
            )
        );
    }, []);

    console.log(likesOnProblemIdCommentId);
    console.log(dislikesOnProblemIdCommentId);

    res.status(200).json({
        stats: {
            likes: likesOnProblemIdCommentId,
            dislikes: dislikesOnProblemIdCommentId,
        },
        status: userStatus,
    });
});

const statusController = asyncHandler(async (req, res) => {
    const { problemId, commentId } = req.params;
    const userId = req.user._id;
    const { status } = req.body;

    let userStatus = await Status.findOne({
        $or: [
            {
                "likes.userId": userId,
                "likes.commentId": commentId,
                "likes.problemId": problemId,
            },
            {
                "dislikes.userId": userId,
                "dislikes.commentId": commentId,
                "dislikes.problemId": problemId,
            },
        ],
    });

    if (!userStatus) {
        userStatus = await Status.create({});
    }

    const likeObjIndex = userStatus.likes.findIndex(
        (like) =>
            like.userId === userId &&
            like.commentId === commentId &&
            like.problemId === problemId
    );

    const dislikeObjIndex = userStatus.dislikes.findIndex(
        (dislike) =>
            dislike.userId === userId &&
            dislike.commentId === commentId &&
            dislike.problemId === problemId
    );

    switch (status) {
        case "liked":
            if (likeObjIndex !== -1) {
                // Toggle off the like
                userStatus.likes.splice(likeObjIndex, 1);
            } else {
                // Add like
                userStatus.likes.push({
                    userId,
                    problemId,
                    commentId,
                    liked: true,
                });

                // Remove from dislikes if it exists
                if (dislikeObjIndex !== -1) {
                    userStatus.dislikes.splice(dislikeObjIndex, 1);
                }
            }
            break;

        case "disliked":
            if (dislikeObjIndex !== -1) {
                // Toggle off the dislike
                userStatus.dislikes.splice(dislikeObjIndex, 1);
            } else {
                // Add dislike
                userStatus.dislikes.push({
                    userId,
                    problemId,
                    commentId,
                    disliked: true,
                });

                // Remove from likes if it exists
                if (likeObjIndex !== -1) {
                    userStatus.likes.splice(likeObjIndex, 1);
                }
            }
            break;
    }

    await userStatus.save();

    const totalStatus = await Status.find({});
    const likesOnProblemIdCommentId = totalStatus.reduce((acc, curr) => {
        return acc.concat(
            curr.likes.filter(
                (like) =>
                    like.problemId === problemId && like.commentId === commentId
            )
        );
    }, []);

    const dislikesOnProblemIdCommentId = totalStatus.reduce((acc, curr) => {
        return acc.concat(
            curr.dislikes.filter(
                (dislike) =>
                    dislike.problemId === problemId &&
                    dislike.commentId === commentId
            )
        );
    }, []);

    console.log(likesOnProblemIdCommentId);
    console.log(dislikesOnProblemIdCommentId);

    res.status(200).json({
        userStatus,
    });
});

const likeController = asyncHandler(async (req, res) => {
    const { problemId, commentId } = req.params;
    const userId = req.user._id;
    const { liked } = req.body;
    console.log("Liked ", liked);
    const userLike = await Like.findOne({
        userId,
        problemId,
        commentId,
    });
    //if object not found that means that he hasnt liked, now trying to hit the like button
    if (!userLike && liked) {
        var newLike = await Like.create({
            userId,
            problemId,
            commentId,
            liked,
        });
    }
    //if object is found that means that he has liked, now trying to hit the dislike button
    else {
        var delLiked = await Like.findByIdAndDelete(userLike._id);
    }
    res.status(200).json(
        new CustomResponse(200, "status", liked ? newLike : { liked: false })
    );
});

const getAllLikes = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    console.log("problemId ==>", problemId);
    const likes = await Like.find({ problemId });
    res.status(200).json(new CustomResponse(200, "status", likes));
});

export {
    toggleDislike,
    toggleLike,
    statusController,
    likeController,
    getAllLikes,
};
