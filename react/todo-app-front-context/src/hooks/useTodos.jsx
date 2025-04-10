import { useContext } from "react";
import TodoContext from "../contexts/todo";

export const useTodo = () => {
    const context = useContext(TodoContext);

    if (!context) {
        throw new Error("useTodo must be used within a TodoProvider");
    }

    const {
        todos,
        filter,
        setFilter,
        addTodo,
        deleteTodo,
        editTodo,
        removeCompletedTodos,
        toggleTodoCompletion,
    } = context;

    const itemsLeft = todos.filter((todo) => !todo.isComplete).length;

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.isComplete;
        if (filter === "completed") return todo.isComplete;
        return true;
    });

    return {
        todos: filteredTodos,
        filter,
        setFilter,
        itemsLeft,
        addTodo,
        deleteTodo,
        editTodo,
        removeCompletedTodos,
        toggleTodoCompletion,
    };
};
