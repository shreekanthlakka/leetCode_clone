import app from "./app.js";
import { UserLoggedInListener } from "./events/listeners/user-loggedin.js";
import { natsWrapper } from "./natsWrapper.js";

const connectToNats = async () => {
    var count = 0;
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
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
            console.log("NATS connection closed !!!");
            process.exit();
        });
        new UserLoggedInListener(natsWrapper.client).listen();

        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
    }
};

const start = async () => {
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS Cluster Id not defined !!!!");
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS Client Id not defined !!!!");
    }
    if (!process.env.NATS_URL) {
        throw new Error("NATS Url not defined !!!");
    }
    if (!process.env.HOST_NM) {
        throw new Error("Host name not defined !!!");
    }
    if (!process.env.PORT_NM) {
        throw new Error("Port not defined");
    }
    if (!process.env.USER_NM) {
        throw new Error("user name not defined!!");
    }
    if (!process.env.PASS_NM) {
        throw new Error("password not defined!!");
    }
    try {
        console.log("Starting notification service =>");
        await connectToNats();
    } catch (error) {
        console.log("<== Error ==>", error.message);
    } finally {
        app.listen(3000, () => {
            console.log(`Notification server ===> 3000 port!!`);
        });
    }
};

start();
