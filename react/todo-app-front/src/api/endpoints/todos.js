import { apiConfig } from "../config";

export async function getTodos() {
    try {
        const response = await apiConfig.get("/todos");
        return response.data;
    } catch (err) {
        throw new Error("Failed to get todo", err);
    }
}
export async function createTodo(text) {
    try {
        const response = await apiConfig.post("/todos", { text });
        return response.data;
    } catch (err) {
        throw new Error("Failed to create todo", err);
    }
}

export async function updateTodo(id, updates) {
    try {
        const response = await apiConfig.put(`/todos/${id}`, updates);
        return response.data;
    } catch (err) {
        throw new Error("Failed to update todo", err);
    }
}

export async function removeTodo(id) {
    try {
        await apiConfig.delete(`/todos/${id}`);
    } catch (err) {
        throw new Error("Failed to delete todo", err);
    }
}
export async function deleteCompletedTodos() {
    try {
        await apiConfig.delete(`/todos/completed`);
    } catch (err) {
        throw new Error("Failed to delete completed todos", err);
    }
}
