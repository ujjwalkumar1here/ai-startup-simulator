import axiosInstance from "./axiosInstance";

const createSimulation = async (payload) =>
  (await axiosInstance.post("/simulations", payload)).data;

const getSimulations = async () =>
  (await axiosInstance.get("/simulations")).data;

const getSimulationById = async (id) =>
  (await axiosInstance.get(`/simulations/${id}`)).data;

const deleteSimulation = async (id) =>
  (await axiosInstance.delete(`/simulations/${id}`)).data;

export default { createSimulation, getSimulations, getSimulationById, deleteSimulation };
