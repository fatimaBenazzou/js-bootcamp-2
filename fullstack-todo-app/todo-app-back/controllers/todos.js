import Todo from "../models/todo.js";

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTodo = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }

    try {
        const newTodo = await Todo.create({ text });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { text, isComplete } = req.body;

    try {
        const updateTodo = await Todo.findByIdAndUpdate(id, { text, isComplete }, { new: true });

        if (!updateTodo) return res.status(404).json({ message: "Todo not found" });

        res.status(200).json(updateTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteCompletedTodos = async (req, res) => {
    try {
        await Todo.deleteMany({ isComplete: true });
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting completed todo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { getTodos, createTodo, updateTodo, deleteTodo, deleteCompletedTodos };
