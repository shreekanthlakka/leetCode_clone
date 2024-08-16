import app from "./app.js";
import WebSocket, { WebSocketServer } from "ws";
import { natsWrapper } from "./nats-wrapper.js";
import { socketWrapper } from "./socket-wrapper.js";
import { JobCompletedStatusListener } from "./events/listeners/jobcompleted-status-listener.js";
import { Server } from "socket.io";
import { createServer } from "http";

const connectToNats = async () => {
    var count = 0;
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        console.log("Connected to NATS !");
        new JobCompletedStatusListener(natsWrapper.client).listen();
    } catch (error) {
        console.log(
            `error connecting to NATS , attempting ${count} th time !!!`,
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
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
    }
};

const start = async () => {
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
        const wss = new WebSocketServer({ port: 3000 });
        wss.on("connection", (ws) => {
            console.log("New connection", ws);
            ws.on("error", console.error);
            ws.on("message", (data) => {
                console.log(`Received message: ${data}`);
            });
            ws.send("Hello from server");
        });

        // const server = new createServer(app);
        // const io = new Server(server, {
        //     cors: {
        //         origin: "*",
        //     },
        // });
        // io.on("connection", (socket) => {
        //     console.log("New connection", socket.id);
        // });
        // io.on("error", (error) => {
        //     console.log("Error =>", error);
        // });

        // server.listen(3000, () => {
        //     console.log("Socket server running on port 3000");
        // });

        await connectToNats();
    } catch (error) {
        console.log("<== Error ==>", error.message);
    }
};

start();
