import { Router } from "express";
import { createOrder, getMyOrders } from "../controllers/order.js";

const orderRouter = Router();

orderRouter.route("/").get(getMyOrders).post(createOrder);

export default orderRouter;
