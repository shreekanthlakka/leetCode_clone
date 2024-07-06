import {
    asyncHandler,
    CustomError,
    CustomResponse,
} from "@shreekanthlakka/common";
import ProblemSubmit from "../models/problemSubmit.model.js";
import { LeetCodeProblemSubmittedPublisher } from "../events/publishers/leetcode-problem-submitted.js";
import { natsWrapper } from "../nats-wrapper.js";

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

    //we need to get the boiler plate code
    //include this typedCode in boiler plate code
    //include the test cases

    new LeetCodeProblemSubmittedPublisher(natsWrapper.client).publish({
        problemId,
        userId: req.user._id,
        title,
        typedCode,
        language,
    });
    res.status(200).json(new CustomResponse(200, "problem submitted", problem));
});

export { submitProblem };
