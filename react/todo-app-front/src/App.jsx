import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import {
    createTodo,
    deleteCompletedTodos,
    getTodos,
    updateTodo,
    removeTodo,
} from "./api/endpoints/todos";

function App() {
    const [theme, setTheme] = useState("light");
    // const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
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

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const addTodo = async (text) => {
        if (text.trim() === "") return;

        // const newTodo = {
        //     id: Date.now().toString(),
        //     text,
        //     isComplete: false,
        // };
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
        // setTodos(
        //     todos.map((todo) => (todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo))
        // );
    };

    const deleteTodo = async (id) => {
        try {
            await removeTodo(id);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
        // setTodos(todos.filter((todo) => todo.id !== id));
    };

    const clearCompleted = async () => {
        try {
            await deleteCompletedTodos();
            setTodos(todos.filter((todo) => !todo.isComplete));
        } catch (error) {
            console.error("Error clearing completed todos:", error);
        }

        // setTodos(todos.filter((todo) => !todo.isComplete));
    };

    const editTodo = async (id, newText) => {
        try {
            const updatedTodo = await updateTodo(id, { text: newText });
            setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error("Error updating todo:", error);
        }
        // setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
    };

    const itemsLeft = todos.filter((todo) => !todo.isComplete).length;
    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.isComplete;
        if (filter === "completed") return todo.isComplete;
        return true;
    });
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
                    todos={filteredTodos}
                    addTodo={addTodo}
                    deleteTodo={deleteTodo}
                    toggleTodoCompletion={toggleTodoCompletion}
                    editTodo={editTodo}
                />
                <Filters
                    filter={filter}
                    setFilter={setFilter}
                    itemsLeft={itemsLeft}
                    clearCompleted={clearCompleted}
                />
            </div>
        </div>
    );
}

export default App;
