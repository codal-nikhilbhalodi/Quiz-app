import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getQuestions = () => API.get("/questions");

export const submitQuiz = (answers) =>
  API.post("/submit", answers);
