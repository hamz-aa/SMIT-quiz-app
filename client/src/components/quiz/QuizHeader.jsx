import React from "react";
import { Typography } from "@mui/material";

const QuizHeader = ({
  currentQuestionIndex,
  totalQuestions,
  seconds,
  totalSeconds,
  customMode,
  quizCompleted,
}) => {
  return (
    <div className="flex justify-between items-center w-full mb-4 p-4 bg-white rounded shadow">
      <Typography variant="h6">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </Typography>
      {!quizCompleted && (
        <Typography variant="h6">
          Time Left: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}
          {seconds % 60}
        </Typography>
      )}
      {customMode && !quizCompleted && (
        <Typography variant="h6">
          Total Time: {Math.floor(totalSeconds / 60)}:
          {totalSeconds % 60 < 10 ? "0" : ""}
          {totalSeconds % 60}
        </Typography>
      )}
    </div>
  );
};

export default QuizHeader;
