import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    type: {
      type: String,
      enum: ["singleChoice", "multipleChoice", "trueFalse", "shortAnswer"],
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "difficult"],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: function () {
          return this.type !== "shortAnswer";
        }, // Options are required unless it's a short answer question
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const QuestionModel = mongoose.model("Question", QuestionSchema);
