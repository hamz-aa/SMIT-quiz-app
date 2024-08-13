import express from "express";
import * as quizReportController from "../controllers/quizReportController.js";

const router = express.Router();

// Create a new quiz report
router.post("/create", quizReportController.createQuizReport);

// Get quiz reports grouped by batch and instructor with average score
router.get("/grouped", quizReportController.getGroupedQuizReports);

// Get detailed quiz reports for a specific quiz
router.get("/details/:quizId", quizReportController.getQuizReportDetails);

export default router;
