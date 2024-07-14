import { isLoggedIn, handleValidationErrors } from "@shreekanthlakka/common";
import express from "express";
import {
    getAllProblems,
    getBoilerPlateCode,
    submitProblem,
} from "../controllers/problemSubmit.controller.js";
import { checkSchema } from "express-validator";
import { problemSubmitSchema } from "../validators/problemSubmit.validator.js";

const router = express.Router();

router.route("/").get(getAllProblems);
router.route("/:problemId/boilerplatecode").get(getBoilerPlateCode);

router
    .route("/submit/:problemId")
    .post(
        isLoggedIn,
        checkSchema(problemSubmitSchema),
        handleValidationErrors,
        submitProblem
    );

export default router;
