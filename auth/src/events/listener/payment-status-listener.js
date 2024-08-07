import { Listener, LeetCodeSubjects } from "@shreekanthlakka/common";
import { queueGroupName } from "./queueGroup.js";

class PaymentStatusListener extends Listener {
    subject = LeetCodeSubjects.PaymentStatus;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        console.log(" => ", data);
        const user = await findOne({ email: data.customer.email });
        if (!user) {
            throw new Error("failed to find the user");
        }
        user.plan = data.paymentStatus ? "Pro" : "Free";
        await user.save();
        msg.ack();
    }
}

export { PaymentStatusListener };
