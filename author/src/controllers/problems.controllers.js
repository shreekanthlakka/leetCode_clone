import {
    asyncHandler,
    CustomError,
    CustomResponse,
} from "@shreekanthlakka/common";
import { generateBoilerPlateCode } from "../utils/generateBoilerPlateCode.js";
import { generateFullBoilerPlateCode } from "../utils/generateFullBoilerPlateCode.js";
import Problem from "../models/problems.model.js";
import { LeetCodeProblemCreatedPublisher } from "../events/publisher/leetcode-problem-created.js";
import { natsWrapper } from "../nats-wrapper.js";
import { generateFullBoilerPlateCodeArgs } from "../utils/generateFullBoilerPlateCodeArgs.js";
import fs from "fs";
import { LeetCodeProblemDeletedPublisher } from "../events/publisher/leetcode-problem-deleted.js";
import path from "path";

const addProblem = asyncHandler(async (req, res) => {
    const { title, description, testCases } = req.body;

    const parsedTestCases =
        typeof testCases === "string" ? JSON.parse(testCases) : testCases;

    const boilerPlate = generateBoilerPlateCode(title, parsedTestCases);
    const boilerPlateFull = generateFullBoilerPlateCodeArgs(
        title,
        parsedTestCases
    );

    const problem = await Problem.create({
        title,
        description,
        testCases: parsedTestCases,
        inputs: parsedTestCases.map((ele) => ele.inputs),
        output: parsedTestCases.map((ele) => ele.output),
        boilerPlate,
        boilerPlateFull,
        userId: req.user._id,
    });

    if (!problem) {
        throw new CustomError(400, "failed to create problem");
    }
    //publish an event

    new LeetCodeProblemCreatedPublisher(natsWrapper.client).publish({
        _id: problem._id,
        title: problem.title,
        description: problem.description,
        inputs: problem.inputs,
        output: problem.output,
        boilerPlate: problem.boilerPlate,
        boilerPlateFull: problem.boilerPlateFull,
        userId: problem.userId,
        testCases: problem.testCases,
    });

    res.status(200).json(
        new CustomResponse(201, "new problem created", problem)
    );
});

const deleteProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new CustomError(400, "not able to find the problem");
    }
    const remProblemId = problem._id;
    const dirpathBoilerplate = path.join(
        problem.boilerPlate.boilerplateDirPath,
        "./"
    );
    const dirpathFullBoilerplate = path.join(
        problem.boilerPlateFull.boilerplateFullDirPath,
        "./"
    );
    if (!dirpathBoilerplate && !dirpathFullBoilerplate) {
        throw new CustomError(400, "failed to locate problem dir");
    }
    console.log("boiler Plate =>", dirpathBoilerplate);
    console.log("full boiler palte =>", dirpathFullBoilerplate);
    fs.rmSync(dirpathBoilerplate, { recursive: true });
    fs.rmSync(dirpathFullBoilerplate, { recursive: true });

    await problem.deleteOne();

    new LeetCodeProblemDeletedPublisher(natsWrapper.client).publish({
        _id: remProblemId,
    });
    res.status(200).json(
        new CustomResponse(200, "deleted sucessfully", { _id: remProblemId })
    );
});

export { addProblem, deleteProblem };

//1 --> we need to get the boiler plate code for c, c++ , javaScript , java

//2 --> we need to get the boiler plate code Full for c, c++ , javaScript , java

//3 --> we need to store this boilerPlateCode and boilerPlateCodeFull in the
//      persistent volume in a centerilized place like /mnt/problems

// 4 --> we need to store the paths of the boilerPlateCode and boilerPlateCodeFull
//       in the DB
//
// 5 --> include the test cases

// 6 --> save it in db

// 7 --> publish an event
