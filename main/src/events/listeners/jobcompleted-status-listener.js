import {
    Listener,
    LeetCodeSubjects,
    CustomError,
} from "@shreekanthlakka/common";
import { queueGroupName } from "./problemCreated-queue-group.js";
import Submission from "../../models/submission.model.js";

class JobCompletedStatusListener extends Listener {
    subject = LeetCodeSubjects.JobCompletedStatus;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        console.log("DATA Received on Listener =>", data);
        const {
            problemId,
            inputs,
            output,
            result,
            status,
            typedCode,
            submitId,
        } = data;
        // const submission = await Submission.findOne({
        //     problemId,
        //     _id: submitId,
        // });

        const statusObj = {
            inputs,
            output,
            result,
            status,
        };
        const submission = await Submission.findOneAndUpdate(
            { problemId, _id: submitId },
            { $push: { testCaseResults: statusObj } },
            { new: true, useFindAndModify: false }
        );

        if (!submission) {
            throw new CustomError(400, "failed to update submission");
        }
        // submission.testCaseResults = [...submission.testCaseResults, statusObj];
        // await submission.save();
        msg.ack();
    }
}

export { JobCompletedStatusListener };
