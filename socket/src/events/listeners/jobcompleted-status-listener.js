import {
    Listener,
    LeetCodeSubjects,
    CustomError,
} from "@shreekanthlakka/common";
import { queueGroupName } from "./socket-queueGraup.js";
import { WebSocketServerClass } from "../../websocket-server.js";
import { socketWrapper } from "../../socket-wrapper.js";

class JobCompletedStatusListener extends Listener {
    subject = LeetCodeSubjects.JobCompletedStatus;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        // console.log("DATA Received on Socket Server =>", data);
        const {
            problemId,
            inputs,
            output,
            result,
            status,
            typedCode,
            submitId,
        } = data;

        // new WebSocketServerClass(socketWrapper.client).broadcast(data);

        msg.ack();
    }
}

export { JobCompletedStatusListener };
