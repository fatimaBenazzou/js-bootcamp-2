import React from "react";
import TodoItem from "./TodoItem";
import useTodo from "../hooks/useTodo";
import SearchBar from "./SearchBar";

export default function TodoList() {
    const { todos } = useTodo();

    return (
        <main>
            {/* add input */}
            <section className="card bg-base-100 shadow-lg rounded-lg mb-4 p-4">
                <SearchBar />
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
