import apiConfig from "../apiConfig";

export const getProducts = () => apiConfig.get("/products");
export const getProductById = (id) => apiConfig.get(`/products/${id}`);
