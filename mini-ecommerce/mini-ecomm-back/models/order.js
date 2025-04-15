import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        cart: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        delivery: {
            province: { type: Number, required: true },
            city: { type: Schema.Types.String, required: true },
            address: { type: Schema.Types.String },
            phone: {
                type: Schema.Types.String,
                required: true,
                validate: [/^(00213|\+213|0)(5|6|7)[0-9]{8}$/, "not valid phone"],
            },
        },
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled", "returned"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const orderModel = model("Order", orderSchema);

export default orderModel;
