import { isLoggedIn, handleValidationErrors } from "@shreekanthlakka/common";
import express from "express";
import {
    getAllProblems,
    getAllSubmissions,
    getBoilerPlateCode,
    getSubmissionStatus,
    submitProblem,
} from "../controllers/submission.controller.js";
import { checkSchema } from "express-validator";
import { problemSubmitSchema } from "../validators/submission.validator.js";

const router = express.Router();

router.route("/").get(getAllProblems);
router.route("/:problemId/boilerplatecode").get(isLoggedIn, getBoilerPlateCode);

router
    .route("/submit/:problemId")
    .post(
        isLoggedIn,
        checkSchema(problemSubmitSchema),
        handleValidationErrors,
        submitProblem
    )
    .get(isLoggedIn, getAllSubmissions);

router
    .route("/submissionStatus/:problemId/:submissionId")
    .get(getSubmissionStatus);

export default router;
