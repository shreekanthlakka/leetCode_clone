import nats from "node-nats-streaming";

class NatsWrapper {
    constructor() {
        this._client = null;
    }
    get client() {
        if (!this._client) {
            throw new Error("Nats not initialized ");
        }
        return this._client;
    }
    connect(clusterId, clientId, url) {
        this._client = nats.connect(clusterId, clientId, { url });
        return new Promise((resolve, reject) => {
            this.client.on("connect", () => {
<<<<<<< HEAD
                console.log("Connected to NATS!!");
=======
                console.log("Connected to NATS!");
>>>>>>> 3a04ebd4d78b1e6a120d4f9818d777b1aa4ba0dd
                resolve();
            });
            this.client.on("error", (err) => {
                console.log("Error connecting to NATS", err.message);
                reject(err.message);
            });
        });
    }
}

export const natsWrapper = new NatsWrapper();
