import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { queueGroupName } from "./problemCreated-queue-group.js";
import Problem from "../../models/problems.model.js";

class LeetCodeProblemDeletedListener extends Listener {
    subject = LeetCodeSubjects.LeetCodeProblemDeleted;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        const problem = await Problem.findByIdAndDelete(data._id);
        if (!problem) {
            throw new Error("failed to delete problem");
        }
        console.log(`Problem deleted successfully ${data._id}`);
        msg.ack();
    }
}

export { LeetCodeProblemDeletedListener };
