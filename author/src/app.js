import express from "express";
import morgan from "morgan";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import addProblemRoute from "./routes/problems.routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const writeStream = fs.createWriteStream(path.join(__dirname, "access.log"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    morgan("combined", {
        stream: writeStream,
    })
);
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(
        `${req.ip} ===> ${req.method} ===> ${req.url} ==> ${new Date()}`
    );
    next();
});

app.use("/api/v1/addProblems", addProblemRoute);

export default app;
