import { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import TodoProvider from "./providers/TodoProvider";

function App() {
    const [theme, setTheme] = useState("light");
    // const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <TodoProvider>
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
                    <TodoList />
                    <Filters />
                </div>
            </div>
        </TodoProvider>
    );
}

export default App;
