import { useState } from "react";
import axios from "axios";
import QuizInfoForm from "../../components/quiz/QuizInfoForm";
import AdditionalSettings from "../../components/quiz/AdditionalSettings";
import AddQuestions from "../../components/quiz/AddQuestions";
import SecondaryButton from "../../components/common/SecondaryButton";
import PrimaryButton from "../../components/common/PrimaryButton";
import { baseUrl } from "../../constants/constants"; // Import baseUrl

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    course: "",
    deadline: "",
    duration: "",
    locationRestriction: false, // Updated to camelCase
    tabSwitchingRestriction: false, // Updated to camelCase
    customMode: false, // Updated to camelCase
    timeLimits: {
      easy: 0,
      medium: 0,
      difficult: 0,
    },
  });

  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [error, setError] = useState("");
  const [quizId, setQuizId] = useState(null); // Store the quiz ID after creation

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
    setQuiz({ ...quiz, timeLimits: { ...quiz.timeLimits, [name]: value } });
  };

  const handleCreateQuiz = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/quiz/create`, quiz);
      setQuizId(response.data.data._id); // Assuming the API returns the created quiz ID
      setIsAddingQuestions(true);
    } catch (error) {
      console.error("There was an error creating the quiz!", error);
      setError("An error occurred while creating the quiz. Please try again.");
    }
  };

  const handleCancel = () => {
    setQuiz({
      title: "",
      description: "",
      course: "",
      deadline: "",
      duration: "",
      locationRestriction: false,
      tabSwitchingRestriction: false,
      customMode: false,
      timeLimits: {
        easy: 0,
        medium: 0,
        difficult: 0,
      },
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
    handleCreateQuiz(); // Call the API before proceeding
    console.log(quiz);
  };

  if (isAddingQuestions && quizId) {
    return (
      <AddQuestions
        quizId={quizId} // Pass the created quiz ID to AddQuestions component
        quiz={quiz}
        setQuiz={setQuiz}
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
