import { asyncHandler, CustomError } from "@shreekanthlakka/common";
import Order from "../models/orders.model.js";
import { stripe } from "../stripe.js";

const createCharge = asyncHandler(async (req, res) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
        throw new CustomError(400, "order not found");
    }
    if (order.userId !== req.user._id) {
        throw new CustomError(400, "unauthorized");
    }
    if (order.status === "cancelled") {
        throw new CustomError(400, "order is cancelled");
    }
    const customar = await stripe.customars.create({
        name: "Testing",
        email: "testing@gmail.com",
        address: {
            line1: "1234 Main St",
            city: "San Francisco",
            state: "CA",
            country: "US",
            postal_code: "94111",
        },
    });
    const charge = await stripe.charges.create({
        amount: order.price * 100,
        currency: "usd",
        description: `Purchased ${order.title}`,
        source: "tok_visa",
    });
});

export { createCharge };
