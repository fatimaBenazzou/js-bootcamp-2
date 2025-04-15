import { startSession } from "mongoose";
import orderModel from "../models/order.js";
import productModel from "../models/product.js";
import { provincesPricesMap } from "../config/provinces-prices.js";

export async function createOrder(req, res) {
    const user = req.user;
    const session = await startSession();

    try {
        session.startTransaction();

        const { cart, delivery } = req.body;
        if (!cart || !Array.isArray(cart) || cart.length === 0 || !delivery) {
            throw new Error("Invalid cart or delivery data");
        }

        const productsIds = cart.map((cartElement) => cartElement.productId);
        const products = await productModel
            .find({
                _id: { $in: productsIds },
            })
            .session(session);

        if (products.length !== cart.length) {
            const foundIds = products.map((p) => p._id.toString());
            const missingIds = productsIds.filter((id) => !foundIds.includes(id.toString()));
            throw new Error(`Some products not found: ${missingIds.join(", ")}`);
        }

        // Vérification du stock et préparation des opérations de mise à jour
        const stockUpdates = [];
        const subtotals = [];

        for (const item of cart) {
            const product = products.find((p) => p._id.equals(item.productId));
            if (!product) {
                throw new Error(`Product ${item.productId} not found`);
            }
            if (product.stock < item.quantity) {
                throw new Error(
                    `Not enough stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
                );
            }

            stockUpdates.push({
                updateOne: {
                    filter: { _id: item.productId },
                    update: { $inc: { stock: -item.quantity } },
                },
            });

            subtotals.push(product.price.current * item.quantity);
        }

        // Mise à jour des stocks en une seule opération
        if (stockUpdates.length > 0) {
            await productModel.bulkWrite(stockUpdates, { session });
        }

        const subtotal = subtotals.reduce((acc, itemPrice) => acc + itemPrice, 0);

        const provinceDetails = provincesPricesMap.get(delivery.province);
        if (!provinceDetails) {
            throw new Error(`Province ${delivery.province} is not supported`);
        }

        const deliveryPrice = provinceDetails.price;
        const total = deliveryPrice + subtotal;

        const [order] = await orderModel.create(
            [
                {
                    cart,
                    delivery,
                    total,
                    userId: user._id,
                    status: "pending", // Ajout d'un statut initial
                },
            ],
            { session }
        );

        await session.commitTransaction();

        res.status(201).json({
            data: order,
            message: "Order created successfully",
        });
    } catch (e) {
        await session.abortTransaction();
        res.status(400).json({
            error: e.message || "Failed to create order",
        });
    } finally {
        session.endSession();
    }
}

export async function getMyOrders(req, res) {
    const user = req.user;
    try {
        const orders = await orderModel.find({ userId: user._id }).populate("cart.productId");
        res.json({
            data: orders,
            message: "Your order has been found successfully",
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}
