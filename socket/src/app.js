import express from "express";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log(
        `===> ${req.ip} ===> ${req.method} ===> ${req.url} ===> ${new Date()}`
    );
    next();
});

export default app;
