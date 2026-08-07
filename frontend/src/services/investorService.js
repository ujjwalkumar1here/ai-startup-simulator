import axiosInstance from "./axiosInstance";

const startSession = async (simulationId) =>
  (await axiosInstance.post("/investor/start", { simulationId })).data;

const answerQuestion = async ({ sessionId, questionNumber, answer }) =>
  (
    await axiosInstance.post("/investor/answer", {
      sessionId,
      questionNumber,
      answer,
    })
  ).data;

const getSession = async (id) =>
  (await axiosInstance.get(`/investor/session/${id}`)).data;

const getHistory = async () =>
  (await axiosInstance.get("/investor/history")).data;

const deleteSession = async (id) =>
  (await axiosInstance.delete(`/investor/session/${id}`)).data;

export default { startSession, answerQuestion, getSession, getHistory, deleteSession };
