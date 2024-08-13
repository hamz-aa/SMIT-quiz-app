import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { baseUrl } from "../../constants/constants"; // Import baseUrl for API calls

const QuizCard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/quiz/all`);
        setQuizzes(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the quizzes!", error);
        setError("Failed to load quizzes. Please try again later.");
      }
    };

    fetchQuizzes();
  }, []);

  const handleStartQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCode("");
  };

  const handleSubmitCode = () => {
    // Placeholder for actual code validation logic
    if (code.trim().length === 6) {
      navigate(`/student/quizzes/${selectedQuizId}`);
      handleCloseModal();
    } else {
      setError("Please enter a valid 6-digit code.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto text-center">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Please Select The Quiz</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-wrap justify-center items-center gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="border border-gray-300 rounded-lg p-6 w-full max-w-xs shadow-md transform transition-transform duration-200 hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-4">{quiz.title}</h2>
            <p className="mb-6">{quiz.description}</p>
            <button
              onClick={() => handleStartQuiz(quiz._id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Enter Quiz Code</h2>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter 6-digit code"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCode}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
