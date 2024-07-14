import {
    asyncHandler,
    CustomError,
    CustomResponse,
} from "@shreekanthlakka/common";
import ProblemSubmit from "../models/problemSubmit.model.js";
import { LeetCodeProblemSubmittedPublisher } from "../events/publishers/leetcode-problem-submitted.js";
import { natsWrapper } from "../nats-wrapper.js";
import Problems from "../models/problems.model.js";
import fs from "fs";
import path from "path";

const submitProblem = asyncHandler(async (req, res) => {
    const { problemId, typedCode, title, language } = req.body;
    const problem = await ProblemSubmit.create({
        problemId,
        userId: req.user._id,
        title,
        typedCode,
        language,
    });
    if (!problem) {
        throw new CustomError(400, "failed to submit!");
    }

    const prob = await Problems.findOne({ _id: problemId });
    if (!prob) {
        throw new CustomError(400, "problem not found!");
    }

    new LeetCodeProblemSubmittedPublisher(natsWrapper.client).publish({
        problemId,
        userId: req.user._id,
        title: prob.title,
        typedCode,
        language,
    });
    res.status(200).json(new CustomResponse(200, "problem submitted", problem));
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
        code[ele.split(".")[1]] = data.toString();
    });
    res.status(200).json(new CustomResponse(200, "boilerplate code", code));
});

export { submitProblem, getAllProblems, getBoilerPlateCode };
