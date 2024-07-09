import express from "express";
import morgan from "morgan";
import fs from "fs";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import problemSubmitRoutes from "./routes/problemSubmit.router.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const writestream = fs.createWriteStream(path.join(__dirname, "access.log"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined", { stream: writestream }));
app.use((req, res, next) => {
    console.log(
        `${req.ip} ===> ${req.method} ===> ${req.url} ==> ${new Date()}`
    );
    next();
});

app.use("/api/v1/problemSubmit", problemSubmitRoutes);

export default app;
