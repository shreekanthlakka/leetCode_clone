import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { QueueGroupName } from "../publishers/QueueGroupName.js";
import User from "../../models/user.model.js";

class PaymentStatusListener extends Listener {
    subject = LeetCodeSubjects.PaymentStatus;
    queueGroupName = QueueGroupName;
    async onMessage(data, msg) {
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
