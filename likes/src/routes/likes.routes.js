import express from "express";
import { isLoggedIn } from "@shreekanthlakka/common";
import {
    statusController,
    toggleDislike,
    toggleLike,
} from "../controllers/likes.controller.js";

const router = express.Router();

router.route("/:problemId/:commentId").post(isLoggedIn, statusController);

export default router;
