import { useState } from "react";
import axios from "axios";
import QuizInfoForm from "../../components/quiz/createQuiz/QuizInfoForm";
import AdditionalSettings from "../../components/quiz/createQuiz/AdditionalSettings";
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <form className="bg-white shadow rounded p-6" onSubmit={handleSubmit}>
        <QuizInfoForm quiz={quiz} handleChange={handleChange} />
        <AdditionalSettings
          quiz={quiz}
          handleCheckboxChange={handleCheckboxChange}
          handleTimeLimitChange={handleTimeLimitChange}
        />
        <div className="flex justify-end space-x-4">
          <SecondaryButton text="Cancel" onClick={handleCancel} />
          <PrimaryButton text="Add Questions" />
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
