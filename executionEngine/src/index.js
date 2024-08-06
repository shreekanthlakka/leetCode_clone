import nats from "node-nats-streaming";
import { natsWrapper } from "./nats-wrapper.js";
import { LeetCodeProblemSubmittedListener } from "./events/listeners/problem-submitted-listener.js";

const startNats = async () => {
    var count = 0;
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        console.log("execution Service => connected to Nats !!");
    } catch (error) {
        console.log(error);
        if (count < 3) {
            console.log(
                "execution Service ==> failed to connect to Nats, retrying ==>"
            );
            setTimeout(() => startNats(count++), 1200);
        }
    }
};

const start = async () => {
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS Cluster Id not defined !!!");
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS Client Id not defined !!");
    }
    if (!process.env.NATS_URL) {
        throw new Error("NATS Url not defined !!!");
    }
    try {
        console.log("Starting executionEngine service ==>");
        await startNats();
    } catch (error) {
        console.log(error);
    } finally {
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed !!!");
            process.exit();
        });
        new LeetCodeProblemSubmittedListener(natsWrapper.client).listen();
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
    }
};

start();
