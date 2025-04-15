import pino from "pino";

const logger = pino(
    { name: "logger" },
    process.env.NODE_ENV === "production"
        ? destination({
              dest: "./info.log",
              append: true,
              sync: true,
          })
        : undefined
);

export default logger;
