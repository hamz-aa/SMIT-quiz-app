import { useEffect, useState } from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import SecondaryButton from "../../components/common/SecondaryButton";
import axios from "axios";

const ViewQuiz = ({ quiz, handleCancel, quizId }) => {
  const [quizData, setQuizData] = useState(quiz || null);

  useEffect(() => {
    if (!quiz && quizId) {
      axios
        .get(`http://localhost:5000/quizzes/${quizId}`)
        .then((response) => {
          setQuizData(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the quiz!", error);
        });
    }
  }, [quiz, quizId]);

  if (!quizData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6 mb-4">
        <h2 className="text-2xl font-bold mb-4">Quiz Overview</h2>
        <p>
          <strong>Title:</strong> {quizData.title}
        </p>
        <p>
          <strong>Description:</strong> {quizData.description}
        </p>
        <p>
          <strong>Course:</strong> {quizData.course}
        </p>
        <p>
          <strong>Deadline:</strong> {quizData.deadline}
        </p>
        <p>
          <strong>Duration:</strong> {quizData.duration} minutes
        </p>
        <p>
          <strong>Location Restriction:</strong>{" "}
          {quizData.location_restriction ? "Yes" : "No"}
        </p>
        <p>
          <strong>Tab Switching Restriction:</strong>{" "}
          {quizData.tab_switching_restriction ? "Yes" : "No"}
        </p>
        <p>
          <strong>Custom Mode:</strong> {quizData.custom_mode ? "Yes" : "No"}
        </p>
        {quizData.custom_mode && (
          <div>
            <p>
              <strong>Easy Time Limit:</strong> {quizData.time_limits.easy}{" "}
              minutes
            </p>
            <p>
              <strong>Medium Time Limit:</strong> {quizData.time_limits.medium}{" "}
              minutes
            </p>
            <p>
              <strong>Difficult Time Limit:</strong>{" "}
              {quizData.time_limits.difficult} minutes
            </p>
          </div>
        )}
        <h3 className="text-xl font-bold mt-6 mb-4">Questions</h3>
        {quizData.questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-gray-50 shadow rounded p-4 mb-4">
            <p>
              <strong>Question {question.id}:</strong> {question.question}
            </p>
            <p>
              <strong>Type:</strong> {question.type}
            </p>
            <p>
              <strong>Points:</strong> {question.points}
            </p>
            {quizData.custom_mode && (
              <p>
                <strong>Difficulty:</strong> {question.difficulty}
              </p>
            )}
            <p>
              <strong>Options:</strong>
            </p>
            <ul>
              {question.options.map((option, oIndex) => (
                <li key={oIndex}>{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-4 fixed bottom-4 right-4">
        <PrimaryButton text="Done" onClick={handleCancel} />
        <SecondaryButton
          text="Edit Quiz"
          onClick={() => alert("Redirect to edit quiz page")}
        />
      </div>
    </div>
  );
};

export default ViewQuiz;
