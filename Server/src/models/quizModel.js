import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date, // Using Date type for better time manipulation
      required: true,
    },
    duration: {
      type: Number, // Assuming duration is in minutes
      required: true,
    },
    locationRestriction: {
      type: Boolean,
      required: true,
    },
    tabSwitchingRestriction: {
      type: Boolean,
      required: true,
    },
    customMode: {
      type: Boolean,
      required: true,
    },
    timeLimits: {
      easy: {
        type: Number,
        required: function () {
          return this.customMode;
        }, // Required if customMode is true
      },
      medium: {
        type: Number,
        required: function () {
          return this.customMode;
        }, // Required if customMode is true
      },
      difficult: {
        type: Number,
        required: function () {
          return this.customMode;
        }, // Required if customMode is true
      },
    },
  },
  { timestamps: true }
);

export const QuizModel = mongoose.model("Quiz", QuizSchema);
