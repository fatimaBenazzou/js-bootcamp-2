import { useTodo } from "../hooks/useTodos";

const buttons = ["all", "active", "completed"];
export default function Filters() {
    const { filter, setFilter, itemsLeft, clearCompleted } = useTodo();

    return (
        <section className="text-center text-gray-400 mt-8">
            <div className="card flex bg-base-100 shadow-lg p-4 rounded-lg">
                <p>{itemsLeft} Items Left</p>
                <div role="tablist" className="tabs filter flex justify-center gap-2">
                    {buttons.map((button, i) => (
                        <button
                            key={"button" + i}
                            role="tab"
                            className={`tab capitalize font-bold-medium hover:font-extrabold ${
                                filter === button ? "tab-active text-blue-400 font-extrabold" : ""
                            }`}
                            onClick={() => setFilter(button)}
                        >
                            {button}
                        </button>
                    ))}
                </div>
                <button onClick={clearCompleted} className="btn btn-ghost">
                    Clear Completed
                </button>
            </div>
        </section>
    );
}
