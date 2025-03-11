// const { add, sub } = require("./mathOperations");
import { add } from "./mathOperations.js";
import chalk from "chalk";

const x = 5,
    y = 8;

console.log(chalk.blue(add(x, y)));
