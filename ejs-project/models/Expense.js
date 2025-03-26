import { model, Schema } from "mongoose";

const expenseSchema = new Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
});

const Expense = model("Expense", expenseSchema);
export default Expense;
