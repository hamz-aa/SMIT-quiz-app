import e from "express";
import {
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getSingleQuiz,
  updateQuiz,
} from "../controllers/quiz.controller.js";
import { jwtAuth } from "../middlewares/jwt.middleware.js";
import { authorizeRole } from "../middlewares/identification.js";
const quizRouter = e.Router();

quizRouter.post("/create", createQuiz);
quizRouter.put("/update/:quizId", updateQuiz);
quizRouter.delete("/remove/:quizId", deleteQuiz);
quizRouter.get("/all", getAllQuiz);
quizRouter.get("/:quizId", getSingleQuiz);

export { quizRouter };
