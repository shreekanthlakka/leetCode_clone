import app from "./app.js";
import WebSocket, { WebSocketServer } from "ws";
import { natsWrapper } from "./nats-wrapper.js";
import { socketWrapper } from "./socket-wrapper.js";
import { JobCompletedStatusListener } from "./events/listeners/jobcompleted-status-listener.js";

// const httpServer = app.listen(8000, () => {
//     console.log("Server is running on port 8000");
// });

// const wss = new WebSocketServer({ server: httpServer });

// wss.on("connection", (ws) => {
//     console.log("New connection", ws);
//     ws.on("message", (data) => {
//         console.log(`Received message: ${data}`);
//     });
//     ws.send("Hello from server");
// });

const connectToNats = async () => {
    var count = 0;
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        console.log("Connected to NATS");
    } catch (error) {
        console.log(
            `error connecting to NATS , attempting ${count} th time !!`,
            error.message
        );
        if (count < 3) {
            setTimeout(() => connectToNats(count++), 1600);
        }
    } finally {
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed!!!");
            process.exit();
        });
        //listener
        new JobCompletedStatusListener(natsWrapper.client).listen();
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
    }
};

const start = async () => {
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS Cluster Id not defined !!");
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS Client Id not defined !!!");
    }
    if (!process.env.NATS_URL) {
        throw new Error("NATS Url not defined !!!");
    }
    try {
        await connectToNats();
        await socketWrapper.connect(3000);
        console.log("Connected to Socket");
    } catch (error) {
        console.log("<== Error ==>", error.message);
    } finally {
        // const server = app.listen(3000, () => {
        //     console.log("Websocket server is running on port 3000");
        // });
        // const wss = new WebSocketServer({ server });
        // wss.on("connection", (ws) => {
        //     console.log("New connection", ws);
        //     ws.on("message", (data) => {
        //         console.log(`Received message: ${data}`);
        //     });
        //     ws.send("Hello from server");
        //     ws.on("error", (err) => {
        //         console.log("Error connecting to websocket ==> ", err);
        //     });
        // });
    }
};

start();
