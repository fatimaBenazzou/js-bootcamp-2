import React, { useEffect, useState } from "react";
import TodoContext from "../contexts/todo";
import {
    createTodo,
    deleteCompletedTodos,
    getTodos,
    removeTodo,
    updateTodo,
} from "../api/endpoints/todos";

export default function TodoProvider({ children }) {
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
            setTodos([...todos, newTodo]);
        } catch (error) {
            console.error("Error creating todo:", error);
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

    const deleteTodo = async (id) => {
        try {
            await removeTodo(id);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const clearCompleted = async () => {
        try {
            await deleteCompletedTodos();
            setTodos(todos.filter((todo) => !todo.isComplete));
        } catch (error) {
            console.error("Error clearing completed todos:", error);
        }
    };

    const editTodo = async (id, newText) => {
        try {
            const updatedTodo = await updateTodo(id, { text: newText });
            setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                filter,
                setFilter,
                addTodo,
                toggleTodoCompletion,
                deleteTodo,
                clearCompleted,
                editTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}
