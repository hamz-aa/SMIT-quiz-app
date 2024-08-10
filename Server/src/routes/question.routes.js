import { Router } from "express";
import {
  createQuestion,
  getQuestion,
  getQuizQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.controller.js";
import { jwtAuth } from "../middlewares/jwt.middleware.js";
import { authorizeRole } from "../middlewares/identification.js";

const questionRouter = Router();
const studentQuestionRouter = Router();

questionRouter.post("/create", createQuestion);

questionRouter.get("/", jwtAuth, authorizeRole("superAdmin"), getQuestion);
questionRouter.get(
  "quiz/:quizId",
  jwtAuth,
  authorizeRole("superAdmin"),
  getQuizQuestion
);
questionRouter.put(
  "/:questionId",
  jwtAuth,
  authorizeRole("superAdmin"),
  updateQuestion
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
