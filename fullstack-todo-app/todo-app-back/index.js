import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routes/todos.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use("/todos", todoRouter);

app.use((req, res) => {
    res.status(404).json({ message: "404 - Page not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

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
