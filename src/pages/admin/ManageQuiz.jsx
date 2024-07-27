import { useEffect, useState } from "react";
import QuizTable from "../../components/quiz/QuizTable";
import axios from "axios";

const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/quizzes")
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the quizzes!", error);
      });
  }, []);

  const deleteQuiz = (id) => {
    axios
      .delete(`http://localhost:5000/quizzes/${id}`)
      .then(() => {
        setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
        alert("Quiz deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the quiz!", error);
      });
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Quizzes</h1>
        <QuizTable quizzes={quizzes} onDelete={deleteQuiz} />
      </div>
    </div>
  );
};

export default ManageQuiz;
