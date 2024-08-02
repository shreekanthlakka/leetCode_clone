import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { queueGroupName } from "../publishers/queue-group-name.js";
import { mailSender } from "../../mailSender.js";

class UserLoggedInListener extends Listener {
    subject = LeetCodeSubjects.UserLoggedIn;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        const message = {
            to: data.email,
            subject: "Welcome to - LeetCode",
            text: `Welcome to LeetCode, ${data.name}!`,
            html: `<h1>Welcome to LeetCode </h1>`,
        };
        mailSender(message);
        msg.ack();
    }
}

export { UserLoggedInListener };
