import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 3000;

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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

app.post("/delete/:id", (req, res) => {
    const { id } = req.params;
    expenses = expenses.filter((e) => e.id !== parseInt(id));
    res.redirect("/");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
