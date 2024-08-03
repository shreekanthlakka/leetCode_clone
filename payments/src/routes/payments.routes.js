import express from "express";
import {
    checkoutWebhook,
    createCharge,
    createCheckoutSession,
} from "../controllers/payments.controller.js";
import { isLoggedIn } from "@shreekanthlakka/common";

const router = express.Router();

router.route("/").post(isLoggedIn, createCharge);
router
    .route("/create-checkout-session")
    .post(isLoggedIn, createCheckoutSession);
router
    .route("/webhook")
    .post(express.raw({ type: "application/json" }), checkoutWebhook);

export default router;
