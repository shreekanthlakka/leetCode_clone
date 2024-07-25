import express from "express";
import { createCharge } from "../controllers/payments.controller.js";
import { isLoggedIn } from "@shreekanthlakka/common";

const router = express.Router();

router.route("/").post(isLoggedIn, createCharge);

export default router;
