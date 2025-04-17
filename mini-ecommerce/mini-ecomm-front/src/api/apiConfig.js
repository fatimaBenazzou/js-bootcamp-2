import axios from "axios";

const apiConfig = axios.create({
    baseURL: "http://localhost:5555/api/v1",
    withCredentials: true,
});

apiConfig.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
apiConfig.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default apiConfig;
