import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { QueueGroupName } from "../publishers/QueueGroupName.js";
import User from "../../models/user.model.js";
import { CustomError } from "@shreekanthlakka/common";

class UserCreatedListener extends Listener {
    subject = LeetCodeSubjects.UserCreated;
    queueGrourName = QueueGroupName;
    async onMessage(data, msg) {
        const user = await User.create({
            _id: data._id,
            email: data.email,
            name: data.name,
        });
        if (!user) {
            throw new CustomError(400, "user creation failed");
        }
        msg.ack();
    }
}

export { UserCreatedListener };
