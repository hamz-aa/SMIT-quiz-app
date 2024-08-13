import { useState, useEffect } from "react";
import axios from "axios";
import QuizInfoForm from "../../components/quiz/QuizInfoForm";
import AdditionalSettings from "../../components/quiz/AdditionalSettings";
import AddQuestions from "../../components/quiz/AddQuestions";
import SecondaryButton from "../../components/common/SecondaryButton";
import PrimaryButton from "../../components/common/PrimaryButton";
import ViewQuiz from "../../components/quiz/ViewQuiz";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/constants";
import EditQuestions from "../../components/quiz/EditQuestions";

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [isViewingQuiz, setIsViewingQuiz] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/quiz/${id}`);
        setQuiz(response.data.data);
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
    setQuiz({ ...quiz, timeLimits: { ...quiz.timeLimits, [name]: value } }); // Corrected to camelCase
  };

  const handleUpdateQuiz = (updatedQuiz) => {
    axios
      .put(`${baseUrl}/api/quiz/update/${id}`, updatedQuiz)
      .then(() => {
        setQuiz(updatedQuiz);
        alert("Quiz updated successfully!");
        // setIsAddingQuestions(false);
        // setIsViewingQuiz(true);
      })
      .catch((error) => {
        console.error("There was an error updating the quiz!", error);
      });
  };

  const handleCancel = () => {
    navigate("/admin/manage-quiz"); // Navigate back to manage quizzes if cancel is clicked
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
    handleUpdateQuiz(quiz);
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
    return <EditQuestions quiz={quiz} handleCancel={handleCancel} />;
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
