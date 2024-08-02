import express from "express";
import { isLoggedIn } from "@shreekanthlakka/common";
import {
    createComment,
    deleteCommentByProblemId,
    getAllComments,
    getCommentsByProblemId,
    updateCommentByProblemId,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.route("/").get(isLoggedIn, getAllComments);

router
    .route("/:problemId")
    .post(isLoggedIn, createComment)
    .get(isLoggedIn, getCommentsByProblemId);

router
    .route("/:problemId/:commentId")
    .put(isLoggedIn, updateCommentByProblemId)
    .delete(isLoggedIn, deleteCommentByProblemId);

export default router;
