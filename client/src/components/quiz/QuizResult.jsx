import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const QuizResult = ({ correctAnswers, totalQuestions, totalTimeTaken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Save the quiz report in db.json
    const saveQuizReport = async () => {
      const quizReport = {
        id: Date.now().toString(), // Generating a unique id based on timestamp
        quizId: "1", // Assuming the quizId is 1, replace it with actual quizId
        studentId: "1", // Assuming the studentId is 1, replace it with actual studentId
        score: (correctAnswers / totalQuestions) * 100,
        dateTaken: new Date().toISOString().split("T")[0],
        timeTaken: `${Math.floor(totalTimeTaken / 60)} minutes ${
          totalTimeTaken % 60
        } seconds`,
        flagged_questions: [], // Assuming flagged_questions is an empty array, replace it with actual data if available
      };

      try {
        await axios.post("http://localhost:5000/quizReports", quizReport);
      } catch (error) {
        console.error("Error saving quiz report:", error);
      }
    };

    saveQuizReport();
  }, [correctAnswers, totalQuestions, totalTimeTaken]);

  const handleBackToHomepage = () => {
    navigate("/quiz-cards"); // Navigating back to the homepage
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <Card className="w-full max-w-2xl p-4 mb-4 bg-white rounded shadow">
        <CardContent className="flex flex-col items-center">
          <Typography variant="h4" className="font-bold mb-4">
            Quiz Result
          </Typography>
          <Typography variant="h6" className="mb-2">
            You scored {correctAnswers} out of {totalQuestions}
          </Typography>
          <Typography variant="h6" className="mb-2">
            Total Time Taken: {Math.floor(totalTimeTaken / 60)} minutes{" "}
            {totalTimeTaken % 60} seconds
          </Typography>
          <div className="flex justify-center mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleBackToHomepage}
              className="bg-blue-500 text-white"
            >
              Back to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResult;
