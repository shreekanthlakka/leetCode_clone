class User {
    constructor(id, ws) {
        this.id = id;
        this.ws = ws;
        this.subscriptions = [];
        this.addListener();
    }
    subscribe(subscription) {
        this.subscriptions.push(subscription);
    }
    unsubscribe(subscription) {
        this.subscriptions = this.subscriptions.filter(
            (s) => s !== subscription
        );
    }
    emit(message) {
        this.ws.send(JSON.stringify(message));
    }
    addListener() {}
}
