import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { queueGroupName } from "./queue-group-name.js";
import { startJob } from "../WorkerJobs/startJob.js";

class LeetCodeProblemSubmittedListener extends Listener {
    subject = LeetCodeSubjects.LeetCodeProblemSubmitted;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        const {
            problemId,
            userId,
            typedCode,
            language,
            title,
            inputs,
            output,
        } = data;
        const inputArr = [];

        inputs.forEach((testCase, i) => {
            console.log(`TEST CASE => ${i + 1}`, testCase);
            const innerArray = [];
            testCase.forEach((inp) => {
                innerArray.push(inp.input.split("=")[1]);
            });
            inputArr.push(innerArray);
        });

        // inputs ==> [ [1,2,3] , [1,1,1] , [] ] something
        // output ==> [ [1,2,3] , [1,1,1] , []]

        inputArr.forEach(async (inp, i) => {
            console.log("==========> inputs ===>", inp);
            console.log("==========> output ===>", output);
            console.log("DATA =>", Array.isArray(inputs));
            console.log("language =>", language);
            startJob(data, inp, output[i]);
            await new Promise((resolve) => setTimeout(resolve, 300));
        });

        // startJob(data, msg);
        msg.ack();
    }
}

export { LeetCodeProblemSubmittedListener };
