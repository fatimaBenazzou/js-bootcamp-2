import { model, Schema } from "mongoose";

const todoSchema = new Schema(
    {
        text: { type: String, required: true },
        isComplete: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export default model("Todo", todoSchema);
