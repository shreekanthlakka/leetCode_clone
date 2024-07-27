import mongoose from "mongoose";
import app from "./app.js";
import { natsWrapper } from "./nats-wrapper.js";
import { UserCreatedListener } from "./events/listeners/user-created-listener.js";

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
        console.log("Starting comment service ==>");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Comments Service connected to MongoDB !!!");
        startNats();
    } catch (error) {
        console.log("Error in comment service ", error);
    }
    app.listen(3000, () => {
        console.log("Comments Server!! ==> Listening on port 3000 !!!");
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
        new UserCreatedListener(natsWrapper.client).listen();
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
