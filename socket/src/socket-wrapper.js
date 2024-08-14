import { WebSocketServer } from "ws";

class SocketWrapper {
    constructor() {
        this._client = null;
    }
    get client() {
        if (!this._client) {
            throw new Error("socket not initialized");
        }
        return this._client;
    }
    connect(port) {
        this._client = new WebSocketServer({ port: port });
        return new Promise((resolve, reject) => {
            this.client.on("listening", (ws) => {
                console.log("Connected to WebSocket !!!");
                resolve(ws);
            });
            this.client.on("error", (err) => {
                console.log("Error in WebSocket !!!");
                reject(err);
            });
        });
    }
}

export const socketWrapper = new SocketWrapper();
