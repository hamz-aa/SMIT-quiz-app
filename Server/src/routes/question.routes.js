import { Router } from "express";
import {
  createQuestion,
  getQuestion,
  getQuizQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionForQuiz,
} from "../controllers/question.controller.js";
import { jwtAuth } from "../middlewares/jwt.middleware.js";
import { authorizeRole } from "../middlewares/identification.js";

const questionRouter = Router();
const studentQuestionRouter = Router();

questionRouter.post("/create", createQuestion);

questionRouter.get("/get/:quizId", getQuestionForQuiz);

questionRouter.put("/update/:questionId", updateQuestion);

questionRouter.get("/", jwtAuth, authorizeRole("superAdmin"), getQuestion);
questionRouter.get(
  "quiz/:quizId",
  jwtAuth,
  authorizeRole("superAdmin"),
  getQuizQuestion
);

questionRouter.delete(
  "/:questionId",
  jwtAuth,
  authorizeRole("superAdmin"),
  deleteQuestion
);

studentQuestionRouter.get("/", jwtAuth, authorizeRole("student"), getQuestion);

export { studentQuestionRouter };
export default questionRouter;
