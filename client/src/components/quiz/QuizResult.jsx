import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import FeedbackModal from "../../components/quiz/FeedbackModal";
import { UserContext } from "../../contexts/UserContext"; // Assuming UserContext is correctly set up
import { baseUrl } from "../../constants/constants"; // Base URL for API endpoints

const QuizResult = ({
  quizId,
  correctAnswers,
  totalQuestions,
  totalTimeTaken,
  flaggedQuestions,
}) => {
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleFeedbackSubmit = async () => {
    setIsFeedbackModalVisible(false);

    const quizReport = {
      quizId: quizId, // Assuming quizId is stored in the user context
      studentId: user._id,
      score: (correctAnswers / totalQuestions) * 100,
      dateTaken: new Date().toISOString(),
      timeTaken: `${Math.floor(totalTimeTaken / 60)} minutes ${
        totalTimeTaken % 60
      } seconds`,
      flaggedQuestions,
      feedback,
    };

    try {
      await axios.post(`${baseUrl}/api/reports/create`, quizReport);
      navigate("/student/quizzes");
    } catch (error) {
      console.error("Error submitting quiz report:", error);
    }
  };

  const handleBackToHomepage = () => {
    setIsFeedbackModalVisible(true);
  };

  const handleCloseFeedback = () => {
    setIsFeedbackModalVisible(false);
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
              Submit and Return to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
      <FeedbackModal
        isFeedbackModalVisible={isFeedbackModalVisible}
        handleFeedbackChange={handleFeedbackChange}
        handleFeedbackSubmit={handleFeedbackSubmit}
        feedback={feedback}
        handleCloseFeedback={handleCloseFeedback}
      />
    </div>
  );
};

export default QuizResult;
