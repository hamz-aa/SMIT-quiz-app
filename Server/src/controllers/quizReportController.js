import * as quizReportService from "../services/quizReportService.js";

// POST /api/quiz-report/create
export const createQuizReport = async (req, res) => {
  try {
    const reportData = req.body;
    const report = await quizReportService.createQuizReport(reportData);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/quiz-report/grouped
export const getGroupedQuizReports = async (req, res) => {
  try {
    const reports = await quizReportService.getGroupedQuizReports();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/quiz-report/details/:quizId
export const getQuizReportDetails = async (req, res) => {
  try {
    const { quizId } = req.params;
    const reports = await quizReportService.getQuizReportDetails(quizId);
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
