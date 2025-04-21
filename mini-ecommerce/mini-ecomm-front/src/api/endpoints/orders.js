import apiConfig from "../apiConfig";

export const createOrder = (props) => apiConfig.post("/orders", { ...props });
export const getMyOrders = () => apiConfig.get("/orders");
