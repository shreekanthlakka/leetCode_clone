import {
    Listener,
    LeetCodeSubjects,
    CustomError,
} from "@shreekanthlakka/common";
import { queueGroupName } from "./queue-group-name.js";
import Order from "../../models/orders.model.js";

class OrderCreatedListener extends Listener {
    subject = LeetCodeSubjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data, msg) {
        const order = await Order.create({
            _id: data._id,
            userId: data.userId,
            price: data.price,
            status: data.status,
        });
        if (!order) {
            throw new CustomError(400, "Order not created");
        }
        msg.ack();
    }
}

export { OrderCreatedListener };
