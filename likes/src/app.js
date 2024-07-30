import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import likeRoute from "./routes/likes.routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const writeStream = fs.createWriteStream(path.join(__dirname, "access.log"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined", { stream: writeStream }));

app.use((req, res, next) => {
    console.log(
        ` ==> ${req.ip} ==> ${req.path} ==> ${req.method} ==> ${
            req.url
        } ==> ${new Date()}`
    );
    next();
});

app.use("/api/v1/likes", likeRoute);

// app.post("/api/v1/like", isLoggedIn, toggleLike);
// app.post("/api/v1/dislike", isLoggedIn, toggleDislike);

export default app;
