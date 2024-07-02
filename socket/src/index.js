import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
    console.log("New connection");
    ws.on("message", (data) => {
        console.log(`Received message: ${data}`);
    });
    ws.send("Hello from server");
});
