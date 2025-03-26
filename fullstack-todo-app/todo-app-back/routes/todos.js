import express from "express";
import {
    createTodo,
    deleteCompletedTodos,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../controllers/todos.js";

const router = express.Router();

router.route("/").get(getTodos).post(createTodo);
router.route("/completed").delete(deleteCompletedTodos);
router.route("/:id").put(updateTodo).delete(deleteTodo);

export default router;
