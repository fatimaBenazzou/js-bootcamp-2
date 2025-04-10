import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { useTodo } from "../hooks/useTodos";

export default function TodoList() {
    const { todos, addTodo } = useTodo();
    const [newTodoText, setNewTodoText] = useState("");
    const handleAddTodo = () => {
        addTodo(newTodoText);
        setNewTodoText("");
    };
    return (
        <main>
            {/* add input */}
            <section className="card bg-base-100 shadow-lg rounded-lg mb-4 p-4">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Create a new todo..."
                        className="flex-1 input input-ghost w-full"
                        onChange={(e) => setNewTodoText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                        value={newTodoText}
                    />
                    <button
                        onClick={handleAddTodo}
                        className="text-base-content btn btn-circle btn-sm btn-ghost border border-gray-400"
                    >
                        +
                    </button>
                </div>
            </section>
            {/* todo items */}
            <ul className="card bg-base-100 shadow-lg rounded-lg">
                {todos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </ul>
        </main>
    );
}
