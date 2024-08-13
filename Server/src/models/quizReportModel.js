import mongoose from "mongoose";

const QuizReportSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    dateTaken: {
      type: Date,
      required: true,
    },
    timeTaken: {
      type: String,
      required: true,
    },
    flaggedQuestions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Question",
      default: [],
    },
    feedback: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const QuizReportModel = mongoose.model("QuizReport", QuizReportSchema);
