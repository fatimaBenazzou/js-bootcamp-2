import React, { useState } from "react";
import useTodo from "../hooks/useTodo";

export default function SearchBar() {
    const [newTodoText, setNewTodoText] = useState("");
    const { addTodo } = useTodo();

    const handleAddTodo = () => {
        addTodo(newTodoText);
        setNewTodoText("");
    };

    return (
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
    );
}
