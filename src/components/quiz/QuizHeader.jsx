import React from "react";
import { Typography, LinearProgress, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const QuizHeader = ({
  currentQuestionIndex,
  totalQuestions,
  seconds,
  totalSeconds,
  customMode,
}) => (
  <div className="flex justify-between items-center w-full mb-4">
    <Typography variant="h6">
      Question {currentQuestionIndex + 1} / {totalQuestions}
    </Typography>
    <div className="flex items-center">
      <AccessTimeIcon />
      <Typography variant="body1">
        {customMode
          ? `${seconds} seconds`
          : `${Math.floor(totalSeconds / 60)}:${totalSeconds % 60} minutes`}
      </Typography>
    </div>
    <CircularProgress
      variant="determinate"
      value={
        customMode
          ? (seconds / (totalSeconds / totalQuestions)) * 100
          : (totalSeconds / (totalSeconds / totalQuestions)) * 100
      }
      className="w-full mt-2"
    />
  </div>
);

export default QuizHeader;
