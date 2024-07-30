import {
    Listener,
    LeetCodeSubjects,
    CustomError,
} from "@shreekanthlakka/common";
import { queueGroupName } from "./queueGroup.js";
import Problem from "../../models/problem.model.js";

class ProblemCreatedListener extends Listener {
    subject = LeetCodeSubjects.LeetCodeProblemCreated;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        console.log("Received Event", this.subject);
        const problem = await Problem.create({
            ...data,
        });
        if (!problem) {
            throw new CustomError(400, "failed in problem creation");
        }
        msg.ack();
    }
}

export { ProblemCreatedListener };
