import {
    Listener,
    LeetCodeSubjects,
    CustomError,
} from "@shreekanthlakka/common";
import { queueGroupName } from "./queueGroup.js";
import User from "../../models/user.model.js";

class UserCreatedListener extends Listener {
    subject = LeetCodeSubjects.UserCreated;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        const { _id, username, email } = data;
        const user = await User.create({
            _id,
            username,
            email,
        });
        if (!user) {
            throw new CustomError(400, "failed to create user");
        }
        msg.ack();
    }
}

export { UserCreatedListener };
