import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import Expense from "./models/Expense.js";

const app = express();
const PORT = 3333;

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static("./public"));

const categories = ["Food", "Entertaiment", "Transportation"];
app.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.render("index", { categories, expenses, selectedCategory: null });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error could't find expense");
    }
});
app.post("/add", async (req, res) => {
    const { description, amount, category, date } = req.body;
    if (!description || !amount || !category || !date) {
        return res.status(400).send("Fill all the inputs");
    }

    try {
        const newExpense = new Expense({
            description,
            amount: parseFloat(amount),
            category,
            date: new Date(date),
        });

        await newExpense.save();
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send(" Error couldn't create expense");
    }
});

app.get("/filter", async (req, res) => {
    const { category } = req.query;
    try {
        const filtredExpenses = category ? await Expense.find({ category }) : await Expense.find();
        res.render("index", { expenses: filtredExpenses, categories, selectedCategory: category });
    } catch (error) {
        console.error(error);
        res.status(500).send(" Error couldn't filter expenses");
    }
});

app.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findById(id);
        if (!expense) return res.status(404).send("Expense not found");

        res.render("edit", { expense, categories });
    } catch (error) {
        console.error(error);
        res.status(500).send(" Error couldn't update expense");
    }
});
app.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { description, amount, category, date } = req.body;
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).send("Expense not found");
        }

        expense.description = description;
        expense.amount = parseFloat(amount);
        expense.category = category;
        expense.date = new Date(date);

        await expense.save();
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send(" Error couldn't update expense");
    }
});

app.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.findByIdAndDelete(id);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send(" Error couldn't delete expense");
    }
});

app.get("/report", async (req, res) => {
    const { month, year } = req.query;
    const selectedMonth = month || new Date().getMonth();
    const selectedYear = year || new Date().getFullYear();
    try {
        const summary = await getMonthlySummary(parseInt(selectedMonth), parseInt(selectedYear));
        res.render("report", { summary, selectedMonth, selectedYear });
    } catch (error) {
        console.log(error);
    }
});

async function getMonthlySummary(month, year) {
    const summary = {};
    try {
        const expenses = await Expense.find();

        expenses.forEach((expense) => {
            const expenseDate = new Date(expense.data);
            if (expenseDate.getMonth() === month && expenseDate.getFullYear() === year) {
                if (!summary[expense.category]) {
                    summary[expense.category] = 0;
                }
                summary[expense.category] += expense.amount;
            }
        });
    } catch (error) {
        console.error(error);
    }

    return summary;
}

mongoose
    .connect(process.env.MONGODB_URI, {
        auth: {
            username: process.env.MONGODB_USER,
            password: process.env.MONGODB_PASSWORD,
        },
        dbName: process.env.MONGODB_DB_NAME,
    })
    .then(() => {
        console.log("DB is Connected!");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
        process.exit(-1);
    });
