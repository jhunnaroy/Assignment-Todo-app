import axios from "axios";

const API = axios.create({
  baseURL: "https://assignment-todo-app-backend.onrender.com/api",
});

//  TOKEN AUTO ATTACH
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;

