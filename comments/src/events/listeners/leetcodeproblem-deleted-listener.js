import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { queueGroupName } from "./queueGroup.js";
import Problem from "../../models/problem.model.js";
import Comment from "../../models/comments.model.js";

class LeetCodeProblemDeletedListener extends Listener {
    subject = LeetCodeSubjects.LeetCodeProblemDeleted;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        const comments = await Comment.findManyAndDelete({
            problemId: data._id,
        });
        const problem = await Problem.findById(data._id);
        if (!problem) {
            throw new Error("Problem not found");
        }
        await problem.deleteOne();
        console.log(`problem deleted ${data._id}`);
        msg.ack();
    }
}

export { LeetCodeProblemDeletedListener };
