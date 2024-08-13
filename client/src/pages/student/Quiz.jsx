import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import QuizHeader from "../../components/quiz/QuizHeader";
import QuestionCard from "../../components/quiz/QuestionCard";
import QuizFooter from "../../components/quiz/QuizFooter";
import QuizResult from "../../components/quiz/QuizResult";
import { baseUrl } from "../../constants/constants"; // Base URL for API endpoints
import { UserContext } from "../../contexts/UserContext"; // Assuming UserContext is correctly set up

const QuizApp = () => {
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(true);
  const [quizEnded, setQuizEnded] = useState(false);
  const [showSkippedQuestions, setShowSkippedQuestions] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [tabSwitchAlertShown, setTabSwitchAlertShown] = useState(false);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0); // New state for total time taken

  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        // Fetch quiz data
        const quizResponse = await axios.get(`${baseUrl}/api/quiz/${quizId}`);
        const quizData = quizResponse.data.data;
        setQuiz(quizData);
        console.log(quizData);

        // Fetch questions for the quiz
        const questionsResponse = await axios.get(
          `${baseUrl}/api/question/get/${quizId}`
        );
        const questionsData = questionsResponse.data.data;
        setQuestions(questionsData);

        if (quizData.customMode) {
          setSeconds(quizData.timeLimits[questionsData[0].difficulty] * 60);
        } else {
          setTotalSeconds(quizData.duration * 60);
          setSeconds(quizData.duration * 60);
        }
        setLoading(false);
      } catch (error) {
        console.error(
          "There was an error fetching the quiz and questions!",
          error
        );
        setLoading(false);
      }
    };

    fetchQuizAndQuestions();
  }, [quizId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          handleSkipQuestion();
          return quiz.customMode
            ? quiz.timeLimits[questions[currentQuestionIndex].difficulty] * 60
            : totalSeconds;
        }
        return prevSeconds - 1;
      });

      if (!quiz?.customMode) {
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
      if (document.hidden) {
        if (!tabSwitchAlertShown) {
          alert("If you change the tab, your quiz will be cancelled.");
          setTabSwitchAlertShown(true);
        } else {
          setIsQuizActive(false);
          setQuizEnded(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabSwitchAlertShown]);

  const handleNextQuestion = useCallback(() => {
    if (selectedOption === questions[currentQuestionIndex]?.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (quiz?.customMode) {
      setSeconds(
        quiz.timeLimits[questions[currentQuestionIndex + 1]?.difficulty] * 60
      );
    }

    if (showSkippedQuestions) {
      if (currentQuestionIndex === skippedQuestions.length - 1) {
        setShowResult(true);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      if (currentQuestionIndex === questions.length - 1) {
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
    setTotalTimeTaken(
      (prev) =>
        prev +
        (quiz.customMode
          ? quiz.timeLimits[questions[currentQuestionIndex].difficulty] * 60 -
            seconds
          : totalSeconds - seconds)
    );
  }, [
    selectedOption,
    quiz,
    currentQuestionIndex,
    skippedQuestions.length,
    showSkippedQuestions,
    seconds,
    totalSeconds,
    questions,
  ]);

  const handleOptionSelect = useCallback((option) => {
    setSelectedOption(option);
    setClicked(true);
  }, []);

  const handleSkipQuestion = useCallback(() => {
    setSkippedQuestions((prev) => [...prev, questions[currentQuestionIndex]]);
    handleNextQuestion();
  }, [currentQuestionIndex, handleNextQuestion, questions]);

  const handleFlagQuestion = useCallback(() => {
    setFlaggedQuestions((prev) => {
      const currentQuestion = questions[currentQuestionIndex];

      const isFlagged = prev.find(
        (question) => question.correctAnswer === currentQuestion.correctAnswer
      );
      if (isFlagged) {
        return prev.filter(
          (question) => question.correctAnswer !== currentQuestion.correctAnswer
        );
      } else {
        return [...prev, currentQuestion];
      }
    });
  }, [currentQuestionIndex, questions]);

  const handleSubmitQuiz = () => {
    setShowResult(true);
    setTotalTimeTaken(
      (prev) =>
        prev +
        (quiz.customMode
          ? quiz.timeLimits[questions[currentQuestionIndex].difficulty] * 60 -
            seconds
          : totalSeconds - seconds)
    );
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
    <div className="flex flex-col items-center p-4 bg-[#efefef] rounded shadow w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quiz Application</h1>
      {isQuizActive ? (
        <>
          <QuizHeader
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            seconds={seconds}
            totalSeconds={totalSeconds}
            customMode={quiz.customMode}
            quizCompleted={showResult}
          />
          {!showResult ? (
            <>
              <QuestionCard
                question={questions[currentQuestionIndex]}
                selectedOption={selectedOption}
                handleOptionSelect={handleOptionSelect}
              />
              <QuizFooter
                handleFlagQuestion={handleFlagQuestion}
                handleNextQuestion={handleNextQuestion}
                handleSkipQuestion={handleSkipQuestion}
                clicked={clicked}
              />
            </>
          ) : (
            <QuizResult
              quizId={quizId}
              correctAnswers={correctAnswers}
              totalQuestions={questions.length}
              totalTimeTaken={totalTimeTaken}
              flaggedQuestions={flaggedQuestions}
            />
          )}
        </>
      ) : (
        <div className="text-center p-4">
          <div className="text-red-500 font-bold">
            The quiz is paused. Please return to the quiz tab.
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
