import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import paymentRoutes from "./routes/payments.routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const writestream = fs.createWriteStream(path.join(__dirname, "access.log"));

const app = express();
app.use(morgan("combined", { stream: writestream }));
app.use(cookieParser());

const allowedOrigins = ["https://checkout.stripe.com", "https://leetcode.dev"];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", true);
    }
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        return res.sendStatus(200); // Respond immediately for OPTIONS requests
    }

    next();
});

app.use((req, res, next) => {
    console.log(
        `===> ${req.ip} ===> ${req.path} ===> ${req.url} ===> ${new Date()}`
    );
    next();
});

app.use("/api/v1/payments", paymentRoutes);

app.use(express.json());

export default app;
