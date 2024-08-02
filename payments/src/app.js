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
app.use(express.json());
app.use(morgan("combined", { stream: writestream }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(
        `===> ${req.ip} ===> ${req.path} ===> ${req.url} ===> ${new Date()}`
    );
    next();
});

app.use("/api/v1/payments", paymentRoutes);

export default app;
