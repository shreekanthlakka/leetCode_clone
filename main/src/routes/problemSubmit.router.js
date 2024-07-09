import { isLoggedIn, handleValidationErrors } from "@shreekanthlakka/common";
import express from "express";
import { submitProblem } from "../controllers/problemSubmit.controller.js";
import { checkSchema } from "express-validator";
import { problemSubmitSchema } from "../validators/problemSubmit.validator.js";

const router = express.Router();

router
    .route("/")
    .post(
        isLoggedIn,
        checkSchema(problemSubmitSchema),
        handleValidationErrors,
        submitProblem
    );

export default router;
