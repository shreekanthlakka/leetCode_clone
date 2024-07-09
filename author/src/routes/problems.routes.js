import express from "express";
import {
    isLoggedIn,
    handleValidationErrors,
    customRole,
} from "@shreekanthlakka/common";
import { addProblem } from "../controllers/problems.controllers.js";
import { checkSchema } from "express-validator";
import { addProblemValidation } from "../validators/addProblems.validation.js";

const router = express.Router();

router
    .route("/")
    .post(
        isLoggedIn,
        customRole(["admin"]),
        checkSchema(addProblemValidation),
        handleValidationErrors,
        addProblem
    );

export default router;
