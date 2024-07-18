import WebSocket, { WebSocketServer } from "ws";

class WebSocketServerClass {
    constructor(client) {
        this.client = client;
    }
    broadcast(data) {
        this.client.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
    close() {
        this.client.clients.forEach((client) => {
            client.close();
        });
    }
}

export { WebSocketServerClass };
