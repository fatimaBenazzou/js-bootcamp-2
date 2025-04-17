import apiConfig from "../apiConfig";

export const register = ({ email, password, firstName, lastName }) =>
    apiConfig.post("/auth/register", { email, password, firstName, lastName });
export const login = ({ email, password }) => apiConfig.post("/auth/login", { email, password });

export async function checkUser() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You aren't logged in");
    return apiConfig.get("/auth");
}
