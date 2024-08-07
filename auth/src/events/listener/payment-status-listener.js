import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { queueGroupName } from "./queueGroup.js";
import User from "../../models/user.model.js";

class PaymentStatusListener extends Listener {
    subject = LeetCodeSubjects.PaymentStatus;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        console.log(" => ", data);
        const user = await User.findOne({ email: data.customer.email });
        if (!user) {
            throw new Error("failed to find the user");
        }
        user.plan = data.paymentStatus === "paid" ? "Pro" : "Free";
        await user.save();
        msg.ack();
    }
}

export { PaymentStatusListener };
