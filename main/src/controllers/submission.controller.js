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

const LanguageName = Object.freeze({
    cpp: "cplusplus",
    js: "javascript",
    rs: "rust",
});

const submitProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const { typedCode, title, language } = req.body;
    const submission = await Submission.create({
        problemId,
        userId: req.user._id,
        title,
        typedCode,
        language,
    });
    if (!submission) {
        throw new CustomError(400, "failed to submit!");
    }

    const prob = await Problems.findOne({ _id: problemId });
    if (!prob) {
        throw new CustomError(400, "problem not found!");
    }

    const boilerPlateCodeFull = await getFullBoilerPlateCode(title, language);

    const combinedCode = boilerPlateCodeFull.replace(
        "##USER_CODE_HERE##",
        typedCode
    );
    new LeetCodeProblemSubmittedPublisher(natsWrapper.client).publish({
        problemId,
        userId: req.user._id,
        title: prob.title,
        typedCode: combinedCode,
        language,
        inputs: prob.inputs,
        output: prob.output,
    });
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

export { submitProblem, getAllProblems, getBoilerPlateCode, getAllSubmissions };
