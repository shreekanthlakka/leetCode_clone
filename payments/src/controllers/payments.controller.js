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
    const customer = await stripe.customers.create({
        name: "Testing",
        email: req.user.email,
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

const createCheckoutSession = asyncHandler(async (req, res) => {
    const { subscription } = req.body;

    const host = `${req.headers.host}`;

    const uri =
        host === "leetcode.dev"
            ? "https://leetcode.dev"
            : "http://www.leetcode-dev.store";

    console.log("HOST ", host);
    console.log("< ========== URI =========> ", uri);

    const customer = await stripe.customers.create({
        name: "Testing",
        email: req.user.email,
        address: {
            line1: "1234 Main St",
            city: "Tirupati",
            state: "AP",
            country: "US",
        },
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Pro Subscription",
                    },
                    unit_amount: 1000 * 100,
                },
                quantity: 1,
            },
        ],
        customer: customer.id,
        mode: "payment",
        success_url: `${uri}/success`,
        cancel_url: `${uri}/cancel`,
    });
    res.status(303).send({ url: session.url });
    // res.redirect(303, session.url);
});

const checkoutWebhook = asyncHandler(async (req, res) => {
    console.log("<========= IN WEBHOOK =========>");
    const sig = req.headers["stripe-signature"];
    console.log("Sig =>", sig);
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.WEBHOOK_SECRET
        );
    } catch (err) {
        res.status(400).send(`==> Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            const checkoutSessionCompleted = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed
            console.log("=========> web hook hit", checkoutSessionCompleted);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.status(200).send();
});

export { createCharge, createCheckoutSession, checkoutWebhook };
