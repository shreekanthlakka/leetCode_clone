import express from "express";
import { isLoggedIn } from "@shreekanthlakka/common";
import {
    getAllLikes,
    likeController,
    statusController,
    toggleDislike,
    toggleLike,
} from "../controllers/likes.controller.js";

const router = express.Router();
router.route("/all/:problemId").get(isLoggedIn, getAllLikes);

router.route("/:problemId/:commentId").post(isLoggedIn, likeController);

export default router;
