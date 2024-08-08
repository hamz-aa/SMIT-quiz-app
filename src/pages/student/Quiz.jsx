import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import QuizHeader from "../../components/quiz/QuizHeader";
import QuestionCard from "../../components/quiz/QuestionCard";
import QuizNavigation from "../../components/quiz/QuizNavigation";
import QuizResult from "../../components/quiz/QuizResult";
import FeedbackModal from "../../components/quiz/FeedbackModal";

const QuizApp = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(true);
  const [quizEnded, setQuizEnded] = useState(false);
  const [showSkippedQuestions, setShowSkippedQuestions] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [tabSwitchAlertShown, setTabSwitchAlertShown] = useState(false);

  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/quizzes/${quizId}`
        );
        setQuiz(response.data);
        if (response.data.custom_mode) {
          setSeconds(
            response.data.time_limits[response.data.questions[0].difficulty] *
              60
          );
        } else {
          setTotalSeconds(response.data.duration * 60);
          setSeconds(response.data.duration * 60);
        }
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the quiz!", error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          handleSkipQuestion();
          return quiz.custom_mode
            ? quiz.time_limits[
                quiz.questions[currentQuestionIndex].difficulty
              ] * 60
            : totalSeconds;
        }
        return prevSeconds - 1;
      });

      if (!quiz.custom_mode) {
        setTotalSeconds((prevTotalSeconds) => {
          if (prevTotalSeconds <= 1) {
            clearInterval(interval);
            handleSubmitQuiz();
            return 0;
          }
          return prevTotalSeconds - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [quiz, currentQuestionIndex, totalSeconds]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // if (document.hidden) {
      //   if (!tabSwitchAlertShown) {
      //     alert("If you change the tab, your quiz will be cancelled.");
      //     setTabSwitchAlertShown(true);
      //   } else {
      //     setIsQuizActive(false);
      //     setQuizEnded(true);
      //   }
      // }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabSwitchAlertShown]);

  const handleNextQuestion = useCallback(() => {
    if (
      selectedOption === quiz.questions[currentQuestionIndex]?.correct_answer
    ) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (quiz.custom_mode) {
      setSeconds(
        quiz.time_limits[quiz.questions[currentQuestionIndex + 1]?.difficulty] *
          60
      );
    }

    if (showSkippedQuestions) {
      if (currentQuestionIndex === skippedQuestions.length - 1) {
        setShowResult(true);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      if (currentQuestionIndex === quiz.questions.length - 1) {
        if (skippedQuestions.length > 0) {
          setShowSkippedQuestions(true);
          setCurrentQuestionIndex(0);
        } else {
          setShowResult(true);
        }
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }

    setClicked(false);
    setSelectedOption(null);
  }, [
    selectedOption,
    quiz,
    currentQuestionIndex,
    skippedQuestions.length,
    showSkippedQuestions,
  ]);

  const handleOptionSelect = useCallback((option) => {
    setSelectedOption(option);
    setClicked(true);
  }, []);

  const handleSkipQuestion = useCallback(() => {
    setSkippedQuestions((prev) => [
      ...prev,
      quiz.questions[currentQuestionIndex],
    ]);
    handleNextQuestion();
  }, [currentQuestionIndex, handleNextQuestion, quiz]);

  const handleFlagQuestion = useCallback(() => {
    setFlaggedQuestions((prev) => {
      const currentQuestion = quiz.questions[currentQuestionIndex];

      const isFlagged = prev.find(
        (question) => question.correct_answer === currentQuestion.correct_answer
      );
      if (isFlagged) {
        return prev.filter(
          (question) =>
            question.correct_answer !== currentQuestion.correct_answer
        );
      } else {
        return [...prev, currentQuestion];
      }
    });
  }, [currentQuestionIndex, quiz]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = () => {
    setIsFeedbackModalVisible(false);
    console.log("Feedback submitted: ", feedback);
  };

  const handleSubmitQuiz = () => {
    const totalScore = correctAnswers * 5;
    console.log("Quiz submitted. Total score:", totalScore);
    setShowResult(true);
  };

  if (quizEnded) {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Quiz Application</h1>
        <div className="text-red-500 font-bold">
          The quiz has ended because you switched tabs. Please restart the quiz.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Quiz Application</h1>
      {isQuizActive ? (
        <div className="flex flex-col items-center w-full max-w-2xl">
          <QuizHeader
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            seconds={seconds}
            totalSeconds={totalSeconds}
            customMode={quiz.custom_mode}
          />
          {!showResult ? (
            <QuestionCard
              question={quiz.questions[currentQuestionIndex]}
              selectedOption={selectedOption}
              handleOptionSelect={handleOptionSelect}
            />
          ) : (
            <QuizResult
              correctAnswers={correctAnswers}
              totalQuestions={quiz.questions.length}
              setIsFeedbackModalVisible={setIsFeedbackModalVisible}
            />
          )}
          {!showResult && (
            <QuizNavigation
              handleFlagQuestion={handleFlagQuestion}
              handleNextQuestion={handleNextQuestion}
              handleSkipQuestion={handleSkipQuestion}
              clicked={clicked}
              showSkippedQuestions={showSkippedQuestions}
            />
          )}
          <FeedbackModal
            isFeedbackModalVisible={isFeedbackModalVisible}
            handleFeedbackChange={handleFeedbackChange}
            handleFeedbackSubmit={handleFeedbackSubmit}
            feedback={feedback}
          />
        </div>
      ) : (
        <div className="text-red-500 font-bold">
          The quiz is paused. Please return to the quiz tab.
        </div>
      )}
    </div>
  );
};

export default QuizApp;
