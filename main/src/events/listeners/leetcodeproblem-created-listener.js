import {
    Listener,
    LeetCodeSubjects,
    CustomError,
} from "@shreekanthlakka/common";
import { queueGroupName } from "./problemCreated-queue-group.js";
import Problems from "../../models/problems.model.js";

class LeetCodeProblemCreatedListener extends Listener {
    subject = LeetCodeSubjects.LeetCodeProblemCreated;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        const problem = await Problems.create({
            _id: data._id,
            title: data.title,
            description: data.description,
            testCases: data.testCases,
            inputs: data.inputs,
            output: data.output,
            boilerPlate: data.boilerPlate,
            boilerPlateFull: data.boilerPlateFull,
            userId: data.userId,
        });
        if (!problem) {
            throw new CustomError(400, "failed to create problem in listener");
        }
        await problem.save();
        msg.ack();
    }
}

export { LeetCodeProblemCreatedListener };
