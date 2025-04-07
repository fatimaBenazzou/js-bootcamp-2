import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
    const [theme, setTheme] = useState("light");
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const addTodo = (text) => {
        if (text.trim() === "") return;

        const newTodo = {
            id: Date.now().toString(),
            text,
            isComplete: false,
        };

        setTodos([...todos, newTodo]);
    };

    const toggleTodoCompletion = (id) => {
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo))
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
    };

    console.log(todos);

    return (
        <div
            data-theme={theme}
            className="min-h-screen bg-base-100 text-base-content bg-no-repeat"
            style={{
                backgroundImage: `url(./images/bg-desktop-${theme}.jpg)`,
                backgroundSize: "100vw 100vh",
            }}
        >
            <div className="container mx-auto px-4 py-12 max-w-md">
                <Header theme={theme} toggleTheme={toggleTheme} />
                <TodoList
                    todos={todos}
                    addTodo={addTodo}
                    deleteTodo={deleteTodo}
                    toggleTodoCompletion={toggleTodoCompletion}
                    editTodo={editTodo}
                />
            </div>
        </div>
    );
}

export default App;
