import axiosInstance from "./axiosInstance";
const register = async ({ name, email, password }) => (await axiosInstance.post("/auth/register", { name, email, password })).data;
const login = async ({ email, password }) => (await axiosInstance.post("/auth/login", { email, password })).data;
const logout = async () => (await axiosInstance.post("/auth/logout")).data;
const getCurrentUser = async () => (await axiosInstance.get("/auth/me")).data;
export default { register, login, logout, getCurrentUser };
