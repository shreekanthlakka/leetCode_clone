import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { queueGroupName } from "./queue-group-name.js";
import { startJob } from "../WorkerJobs/startJob.js";

class LeetCodeProblemSubmittedListener extends Listener {
    subject = LeetCodeSubjects.LeetCodeProblemSubmitted;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        // console.log("Listener ==> ", data);
        await startJob(data, msg);
        // msg.ack();
    }
}

export { LeetCodeProblemSubmittedListener };
