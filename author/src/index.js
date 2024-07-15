import mongoose from "mongoose";
import app from "./app.js";
import { natsWrapper } from "./nats-wrapper.js";

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URL must be defined!!!");
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
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Author Server ==> Connected to MongoDB !!!");
        startNats();
    } catch (error) {
        console.log(" <== Error ==> ", error.message);
    }
    app.listen(3000, () => {
        console.log("Author Server ==> Listening on port 3000 !!!");
    });
};

start();

const startNats = async () => {
    var count = 0;
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        console.log("Connected to NATS !!");
    } catch (error) {
        console.log(
            ` <== error connecting to nats attempting ${count + 1} time =>`
        );
        if (count < 3) {
            setTimeout(() => startNats(count++), 1400);
        }
    } finally {
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed");
            process.exit();
        });
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
    }
};
