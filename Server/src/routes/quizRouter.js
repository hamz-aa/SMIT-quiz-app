import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getSingleQuiz,
  updateQuiz,
} from "../controllers/quizController.js";

const quizRouter = express.Router();

quizRouter.post("/create", createQuiz);
quizRouter.put("/update/:quizId", updateQuiz);
quizRouter.delete("/remove/:quizId", deleteQuiz);
quizRouter.get("/all", getAllQuiz);
quizRouter.get("/:quizId", getSingleQuiz);

export { quizRouter };
