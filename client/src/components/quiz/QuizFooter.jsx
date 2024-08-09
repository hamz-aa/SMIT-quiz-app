import React from "react";
import { Button } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const QuizFooter = ({
  handleFlagQuestion,
  handleNextQuestion,
  handleSkipQuestion,
  clicked,
}) => {
  return (
    <div className="flex justify-between items-center w-full mt-4">
      <Button
        variant="contained"
        color="secondary"
        className="bg-red-500 text-white"
        onClick={handleFlagQuestion}
        startIcon={<FlagIcon />}
        style={{ height: "50px", padding: "10px" }}
      >
        Flag
      </Button>
      <div className="flex space-x-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSkipQuestion}
          className="bg-gray-500 text-white"
          startIcon={<SkipNextIcon />}
          style={{ height: "50px", padding: "10px" }}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestion}
          disabled={!clicked}
          style={{ height: "50px", padding: "10px" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuizFooter;
