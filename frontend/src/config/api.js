import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + "/api" || "http://localhost:3000/api",
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default API;
