import { Router } from "express";
import {
  createQuestion,
  updateQuestion,
  getQuestionForQuiz,
} from "../controllers/questionController.js";

const questionRouter = Router();

questionRouter.post("/create", createQuestion);
questionRouter.get("/get/:quizId", getQuestionForQuiz);
questionRouter.put("/update/:questionId", updateQuestion);

export default questionRouter;
