import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 3000;

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static("./public"));

let expenses = [
    {
        id: 1,
        description: "Groceries",
        amount: 3000,
        category: "Food",
        date: "2025-01-20",
    },
    {
        id: 2,
        description: "Gasoline",
        amount: 900,
        category: "Transportation",
        date: "2025-01-21",
    },
];

const categories = ["Food", "Entertaiment", "Transportation"];
app.get("/", (req, res) => {
    res.render("index", { categories, expenses });
});
app.post("/add", (req, res) => {
    const { description, amount, category, date } = req.body;
    if (!description || !amount || !category || !date) {
        return res.status(400).send("Fill all the inputs");
    }

    const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
        date,
    };

    expenses.push(newExpense);
    res.redirect("/");
});

app.get("/filter", (req, res) => {
    const { category } = req.query;
    const filtredExpenses = category ? expenses.filter((e) => e.category === category) : expenses;
    res.render("index", { expenses: filtredExpenses, categories });
});

app.get("/edit/:id", (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === parseInt(id));
    if (!expense) {
        return res.status(404).send("Expense not found");
    }
    res.render("edit", { expense, categories });
});
app.post("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;

    const expense = expenses.find((e) => e.id === parseInt(id));
    if (!expense) {
        return res.status(404).send("Expense not found");
    }

    expense.description = description;
    expense.amount = parseFloat(amount);
    expense.category = category;
    expense.date = date;
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const { id } = req.params;
    expenses = expenses.filter((e) => e.id !== parseInt(id));
    res.redirect("/");
});

app.get("/report", (req, res) => {
    const { month, year } = req.query;
    const selectedMonth = month || new Date().getMonth();
    const selectedYear = year || new Date().getFullYear();

    const summary = getMonthlySummary(parseInt(selectedMonth), parseInt(selectedYear));
    console.log(summary);
    res.render("report", { summary, selectedMonth, selectedYear });
});

function getMonthlySummary(month, year) {
    const summary = {};

    expenses.forEach((expense) => {
        const expenseDate = new Date(expense.data);
        if (expenseDate.getMonth() === month && expenseDate.getFullYear() === year) {
            if (!summary[expense.category]) {
                summary[expense.category] = 0;
            }
            summary[expense.category] += expense.amount;
        }
    });

    return summary;
}
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
