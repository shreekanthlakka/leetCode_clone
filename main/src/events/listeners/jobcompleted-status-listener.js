import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { queueGroupName } from "./problemCreated-queue-group.js";

class JobCompletedStatusListener extends Listener {
    subject = LeetCodeSubjects.JobCompletedStatus;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        console.log("DATA Received on Listener =>", data);
        msg.ack();
    }
}

export { JobCompletedStatusListener };
