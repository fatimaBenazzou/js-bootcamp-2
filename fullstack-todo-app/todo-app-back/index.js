import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routes/todos.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use("/todos", todoRouter);

mongoose
    .connect(process.env.MONGODB_URI, {
        auth: {
            username: process.env.MONGODB_USER,
            password: process.env.MONGODB_PASSWORD,
        },
        dbName: process.env.MONGODB_DB_NAME,
    })
    .then(() => {
        console.log("DB is connected");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Mongodb error: " + err);
        process.exit(1);
    });
