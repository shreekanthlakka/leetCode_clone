// import dotenv from "dotenv";
// dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";
import { natsWrapper } from "./natsWrapper.js";
import { v2 as cloudinary } from "cloudinary";
import { PaymentStatusListener } from "./events/listener/payment-status-listener.js";

const startNats = async () => {
    var count = 0;
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        new PaymentStatusListener(natsWrapper.client).listen();
    } catch (error) {
        console.log("error ==-> ", error);
        if (count < 3) {
            setTimeout(() => startNats(count++), 1000);
        }
    } finally {
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed !!");
            process.exit();
        });
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
    }
};

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URL must be defined !!!");
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS Cluster Id not defined !!");
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS Client Id not defined !!!");
    }
    if (!process.env.NATS_URL) {
        throw new Error("NATS Url not defined !!!!");
    }
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
        throw new Error("CLOUDINARY_CLOUD_NAME not found !!!");
    }
    if (!process.env.CLOUDINARY_API_KEY) {
        throw new Error("CLOUDINARY_API_KEY not found !!");
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
        throw new Error("CLOUDINARY_API_SECRET not found !!!");
    }
    try {
        console.log("Starting auth service ===>");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB !!");
        await cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log("Cloudinary configured !!");
        startNats();
    } catch (error) {
        console.log("error ==> ", error.message);
    }

    app.listen(3000, () => {
        console.log(`Auth Server ==> port 3000 !!`);
    });
};

start();
