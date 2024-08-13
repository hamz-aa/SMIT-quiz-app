import { QuizReportModel } from "../models/quizReportModel.js";
// import { QuizModel } from "../models/Quiz.js";
// import { StudentModel } from "../models/Student.js";

// Create a new quiz report
export const createQuizReport = async (reportData) => {
  const quizReport = new QuizReportModel(reportData);
  return quizReport.save();
};

// Get quiz reports grouped by batch and instructor with average score
export const getGroupedQuizReports = async () => {
  return QuizReportModel.aggregate([
    {
      $lookup: {
        from: "quizzes",
        localField: "quizId",
        foreignField: "_id",
        as: "quiz",
      },
    },
    { $unwind: "$quiz" },
    {
      $lookup: {
        from: "students",
        localField: "studentId",
        foreignField: "_id",
        as: "student",
      },
    },
    { $unwind: "$student" },
    {
      $group: {
        _id: {
          quizId: "$quiz._id",
          batch: "$student.batch",
          instructor: "$student.instructor",
        },
        title: { $first: "$quiz.title" },
        course: { $first: "$quiz.course" },
        averageScore: { $avg: "$score" },
      },
    },
    {
      $project: {
        _id: 0,
        quizId: "$_id.quizId",
        batch: "$_id.batch",
        instructor: "$_id.instructor",
        title: 1,
        course: 1,
        averageScore: { $round: ["$averageScore", 2] },
      },
    },
  ]);
};

// Get detailed quiz reports for a specific quiz
export const getQuizReportDetails = async (quizId) => {
  return QuizReportModel.find({ quizId })
    .populate("studentId", "name email")
    .select("score timeTaken flaggedQuestions feedback");
};
