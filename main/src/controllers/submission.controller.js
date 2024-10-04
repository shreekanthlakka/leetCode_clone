import {
    asyncHandler,
    CustomError,
    CustomResponse,
} from "@shreekanthlakka/common";
import Submission from "../models/submission.model.js";
import { LeetCodeProblemSubmittedPublisher } from "../events/publishers/leetcode-problem-submitted.js";
import { natsWrapper } from "../nats-wrapper.js";
import Problems from "../models/problems.model.js";
import fs from "fs";
import path from "path";
import { getFullBoilerPlateCode } from "../utils/getFullBoilerPlateCode.js";
import User from "../models/user.model.js";

const LanguageName = Object.freeze({
    cpp: "cplusplus",
    js: "javascript",
    rs: "rust",
    py: "python",
});

const submitProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const { typedCode, title, language } = req.body;

    const boilerPlateCodeFull = await getFullBoilerPlateCode(title, language);
    const combinedCode = boilerPlateCodeFull.replace(
        "##USER_CODE_HERE##",
        typedCode
    );

    console.log("executed code ==> ", combinedCode);

    const submission = await Submission.create({
        problemId,
        userId: req.user._id,
        title,
        typedCode,
        language,
        executedCode: combinedCode,
    });
    if (!submission) {
        throw new CustomError(400, "failed to submit!");
    }

    const prob = await Problems.findOne({ _id: problemId });
    if (!prob) {
        throw new CustomError(400, "problem not found!");
    }
    const user = await User.findOne({
        _id: req.user._id,
        email: req.user.email,
    });
    if (!user) {
        throw new CustomError(400, "user not found!");
    }

    console.log("Problem id ===>", prob);
    new LeetCodeProblemSubmittedPublisher(natsWrapper.client).publish({
        problemId,
        userId: req.user._id,
        title: prob.title,
        typedCode: combinedCode,
        language,
        inputs: prob.inputs,
        output: prob.output,
        submitId: submission._id,
        plan: user.plan,
    });
    // const initialTestCaseResults = prob.testCases.map((ele) => {
    //     return {
    //         inputs: ele.inputs,
    //         output: ele.output,
    //         status: "PENDING",
    //     };
    // });
    // console.log("Initial TestCase results  ===> ", initialTestCaseResults);
    // submission.testCaseResults = initialTestCaseResults;
    submission.inputs = prob.inputs;
    submission.output = prob.output;
    await submission.save();
    res.status(200).json(
        new CustomResponse(200, "problem submitted", submission)
    );
});

const getAllProblems = asyncHandler(async (req, res) => {
    const problems = await Problems.find({});
    if (!problems) {
        throw new CustomError(400, "error while retriving the problems");
    }
    res.status(200).json(
        new CustomResponse(200, "problems retrived", problems)
    );
});

const getAllSubmissions = asyncHandler(async (req, res) => {
    const submissions = await Submission.find({
        userId: req.user._id,
        problemId: req.params.problemId,
    });
    if (!submissions) {
        throw new CustomError(400, "No submissions made");
    }
    res.status(200).json(
        new CustomResponse(200, "all submissions", submissions)
    );
});

const getBoilerPlateCode = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const problem = await Problems.findOne({ _id: problemId });
    if (!problem) {
        throw new CustomError(400, "problem not found!");
    }
    const boilerplatePath = path.join(
        "/mnt/shared/problems",
        `boilerplate/${problem.title}`
    );
    const dir = fs.readdirSync(boilerplatePath);
    const code = {};
    dir.forEach((ele) => {
        const data = fs.readFileSync(`${boilerplatePath}/${ele}`);
        code[LanguageName[ele.split(".")[1]]] = data.toString();
    });
    res.status(200).json(new CustomResponse(200, "boilerplate code", code));
});

const getSubmissionStatus = asyncHandler(async (req, res) => {
    const { problemId, submissionId } = req.params;
    const submission = await Submission.findOne({
        _id: submissionId,
        problemId,
    });
    if (!submission) {
        throw new CustomError(400, "submission not found");
    }
    res.status(200).json(
        new CustomResponse(200, "submission status", submission)
    );
});

export {
    submitProblem,
    getAllProblems,
    getBoilerPlateCode,
    getAllSubmissions,
    getSubmissionStatus,
};
