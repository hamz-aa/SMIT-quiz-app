import { useState, useEffect } from "react";
import axios from "axios";
import QuizInfoForm from "../../components/quiz/QuizInfoForm";
import AdditionalSettings from "../../components/quiz/AdditionalSettings";
import AddQuestions from "../../components/quiz/AddQuestions";
import SecondaryButton from "../../components/common/SecondaryButton";
import PrimaryButton from "../../components/common/PrimaryButton";
import ViewQuiz from "../../components/quiz/ViewQuiz";
import { useParams } from "react-router-dom";

const EditQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [isViewingQuiz, setIsViewingQuiz] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("There was an error fetching the quiz!", error);
      }
    };

    fetchQuiz();
  }, [id]);

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

  const handleUpdateQuiz = (updatedQuiz) => {
    axios
      .put(`http://localhost:5000/quizzes/${id}`, updatedQuiz)
      .then(() => {
        setQuiz(updatedQuiz);
        alert("Quiz updated successfully!");
        setIsAddingQuestions(false);
        setIsViewingQuiz(true);
      })
      .catch((error) => {
        console.error("There was an error updating the quiz!", error);
      });
  };

  const handleCancel = () => {
    setIsAddingQuestions(false);
    setIsViewingQuiz(false);
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

  if (!quiz) {
    return <p>Loading...</p>;
  }

  if (isViewingQuiz) {
    return <ViewQuiz quiz={quiz} handleCancel={handleCancel} />;
  }

  if (isAddingQuestions) {
    return (
      <AddQuestions
        quiz={quiz}
        setQuiz={setQuiz}
        handleCreateQuiz={handleUpdateQuiz}
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
          <PrimaryButton text="Edit Questions" onClick={handleAddQuestions} />
        </div>
      </form>
    </div>
  );
};

export default EditQuiz;
