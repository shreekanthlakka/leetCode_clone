import {
    Listener,
    LeetCodeSubjects,
    CustomError,
} from "@shreekanthlakka/common";
import { queueGroupName } from "./queue-group-name.js";
import Order from "../../models/orders.model.js";

class OrderCancelledListener extends Listener {
    subject = LeetCodeSubjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        const order = await Order.findOne({
            _id: data._id,
        });
        if (!order) {
            throw new CustomError(400, "Order not found");
        }
        order.set({ status: "cancelled" });
        await order.save();
        msg.ack();
    }
}

export { OrderCancelledListener };
