import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    updatetProduct,
} from "../controllers/products.js";

const managingProductsRouter = Router();

managingProductsRouter.post("/", createProduct);
managingProductsRouter
    .route("/:productId")
    .get(getProduct)
    .put(updatetProduct)
    .delete(deleteProduct);

export default managingProductsRouter;
