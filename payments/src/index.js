import mongoose from "mongoose";
import app from "./app.js";
import { natsWrapper } from "./nats-wrapper.js";
import { OrderCreatedListener } from "./events/listeners/order-created-listener.js";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener.js";

const start = async () => {
    if (!process.env.WEBHOOK_SECRET) {
        throw new Error("WEBHOOK_SECRET must be defined !!!");
    }
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URL must be defined !!!!");
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS Cluster Id not defined !!!");
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS Client Id not defined !!!");
    }
    if (!process.env.NATS_URL) {
        throw new Error("NATS Url not defined !!!");
    }
    try {
        console.log("Starting payment service ===>");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Payment service connected to MongoDB !!!");
        startNats();
    } catch (error) {
        console.log(" <== Error ==> ", error.message);
        process.exit(1);
    }
    app.listen(3000, () => {
        console.log("Payment service listening on port 3000 !!!");
    });
};

const startNats = async () => {
    var count = 0;
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        console.log("Payment Service ==> connected to NATS !!");

        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();
    } catch (error) {
        console.log(
            ` <== error connecting to nats attempting ${count + 1} time !!!`
        );
        if (count < 3) {
            setTimeout(() => startNats(count++), 1400);
        }
    } finally {
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed !!!");
            process.exit();
        });
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
    }
};

start();
