import { useState, useEffect } from "react";
import {
    createTodo,
    deleteCompletedTodos,
    getTodos,
    removeTodo,
    updateTodo,
} from "../api/endpoints/todos";
import TodoContext from "../contexts/todo";

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
    }, []);

    const addTodo = async (text) => {
        if (text.trim() === "") return;
        try {
            const newTodo = await createTodo(text);
            setTodos((prev) => [...prev, newTodo]);
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    const editTodo = async (id, updates) => {
        try {
            const updatedTodo = await updateTodo(id, updates);
            // setTodos((prev) => prev.map((todo) => (todo._id === id ? updatedTodo : todo)));
            setTodos((prev) => prev.map((todo) => (todo._id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await removeTodo(id);
            setTodos((prev) => prev.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const toggleTodoCompletion = async (id) => {
        const todoToUpdate = todos.find((todo) => todo._id === id);
        if (!todoToUpdate) return;

        try {
            const updatedTodo = await updateTodo(id, {
                isComplete: !todoToUpdate.isComplete,
            });
            setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const removeCompletedTodos = async () => {
        try {
            await deleteCompletedTodos();
            setTodos((prev) => prev.filter((todo) => !todo.isComplete));
        } catch (error) {
            console.error("Error clearing completed todos:", error);
        }
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                filter,
                setFilter,
                addTodo,
                editTodo,
                deleteTodo,
                toggleTodoCompletion,
                removeCompletedTodos,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
