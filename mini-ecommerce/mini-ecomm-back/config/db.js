import mongoose from "mongoose";
import logger from "./logger.js";

const dbConnection = mongoose
    .connect(process.env.MONGODB_URI, {
        auth: {
            username: process.env.MONGODB_USER,
            password: process.env.MONGODB_PASSWORD,
        },
        dbName: process.env.MONGODB_DB_NAME,
    })
    .then(() => {
        console.log(`DB connected in ${process.env.MONGODB_DB_NAME}`);
        logger.debug(`DB connected in ${process.env.MONGODB_DB_NAME}`);
    })
    .catch((error) => {
        logger.error(error);
    });

export default dbConnection;
