import { useState } from "react";

export default function TodoItem({ todo, deleteTodo, toggleTodoCompletion, editTodo }) {
    const [editText, setEditText] = useState(todo.text);

    const saveEdit = () => {
        editTodo(todo.id, editText);
        document.getElementById(`edit-modal-${todo.id}`).close();
    };

    return (
        <>
            <li className="flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        onChange={() => toggleTodoCompletion(todo.id)}
                        checked={todo.isComplete}
                    />
                    <p className={todo.isComplete ? "line-through text-gray-400" : ""}>
                        {todo.text}
                    </p>
                </div>
                <div className="flex">
                    <button
                        className="btn btn-ghost btn-sm text-base-content"
                        onClick={() => document.getElementById(`edit-modal-${todo.id}`).showModal()}
                    >
                        🖋
                    </button>
                    <button
                        className="btn btn-ghost btn-sm text-base-content"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        ❌
                    </button>
                </div>
            </li>

            <dialog id={`edit-modal-${todo.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Todo</h3>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="input input-bordered w-full mt-4"
                    />
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={saveEdit}>
                                Save
                            </button>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
