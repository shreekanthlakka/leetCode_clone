import nats from "node-nats-streaming";

class NatsWrapper {
    constructor() {
        this._client = null;
    }
    get client() {
        if (!this._client) {
            throw new Error("Client is not initialized");
        }
        return this._client;
    }
    connect(clusterId, clientId, url) {
        this._client = nats.connect(clusterId, clientId, { url });
        return new Promise((resolve, reject) => {
            this.client.on("connect", () => {
                resolve();
            });
            this.client.on("error", (err) => {
                reject(err);
            });
        });
    }
}

export const natsWrapper = new NatsWrapper();
