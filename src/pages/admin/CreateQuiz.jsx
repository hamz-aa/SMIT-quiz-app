import { useState } from "react";
import axios from "axios";
import QuizInfoForm from "../../components/quiz/createQuiz/QuizInfoForm";
import AdditionalSettings from "../../components/quiz/createQuiz/AdditionalSettings";
import AddQuestions from "../../components/quiz/createQuiz/AddQuestions";
import SecondaryButton from "../../components/common/SecondaryButton";
import PrimaryButton from "../../components/common/PrimaryButton";

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    course: "",
    deadline: "",
    duration: "",
    location_restriction: false,
    tab_switching_restriction: false,
    custom_mode: false,
    time_limits: {
      easy: 0,
      medium: 0,
      difficult: 0,
    },
    questions: [],
  });

  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setQuiz({ ...quiz, [name]: checked });
  };

  const handleTimeLimitChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, time_limits: { ...quiz.time_limits, [name]: value } });
  };

  const handleCreateQuiz = () => {
    axios
      .post("http://localhost:5000/quizzes", quiz)
      .then(() => {
        setQuiz({
          title: "",
          description: "",
          course: "",
          deadline: "",
          duration: "",
          location_restriction: false,
          tab_switching_restriction: false,
          custom_mode: false,
          time_limits: {
            easy: 0,
            medium: 0,
            difficult: 0,
          },
          questions: [],
        });
        alert("Quiz created successfully!");
        setIsAddingQuestions(false);
      })
      .catch((error) => {
        console.error("There was an error creating the quiz!", error);
      });
  };

  const handleCancel = () => {
    setQuiz({
      title: "",
      description: "",
      course: "",
      deadline: "",
      duration: "",
      location_restriction: false,
      tab_switching_restriction: false,
      custom_mode: false,
      time_limits: {
        easy: 0,
        medium: 0,
        difficult: 0,
      },
      questions: [],
    });
    setIsAddingQuestions(false);
  };

  const handleAddQuestions = () => {
    if (
      !quiz.title ||
      !quiz.description ||
      !quiz.course ||
      !quiz.deadline ||
      !quiz.duration
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setIsAddingQuestions(true);
  };

  if (isAddingQuestions) {
    return (
      <AddQuestions
        quiz={quiz}
        setQuiz={setQuiz}
        handleCreateQuiz={handleCreateQuiz}
        handleCancel={handleCancel}
      />
    );
  }

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <form className="bg-white shadow rounded p-6">
        <QuizInfoForm quiz={quiz} handleChange={handleChange} />
        <AdditionalSettings
          quiz={quiz}
          handleCheckboxChange={handleCheckboxChange}
          handleTimeLimitChange={handleTimeLimitChange}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end space-x-4">
          <SecondaryButton text="Cancel" onClick={handleCancel} />
          <PrimaryButton text="Add Questions" onClick={handleAddQuestions} />
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
