import React from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import SecondaryButton from "../../components/common/SecondaryButton";
import { useNavigate } from "react-router-dom";

const ViewQuiz = ({ quizId, quiz, handleCancel, questions }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6 mb-4">
        <h2 className="text-3xl font-bold mb-6 text-primary">Quiz Overview</h2>
        <div className="mb-4">
          <p className="mb-2">
            <strong className="text-secondary">Title:</strong> {quiz.title}
          </p>
          <p className="mb-2">
            <strong className="text-secondary">Description:</strong>{" "}
            {quiz.description}
          </p>
          <p className="mb-2">
            <strong className="text-secondary">Course:</strong> {quiz.course}
          </p>
          <p className="mb-2">
            <strong className="text-secondary">Deadline:</strong>{" "}
            {quiz.deadline}
          </p>
          <p className="mb-2">
            <strong className="text-secondary">Duration:</strong>{" "}
            {quiz.duration} minutes
          </p>
          <p className="mb-2">
            <strong className="text-secondary">Location Restriction:</strong>{" "}
            {quiz.locationRestriction ? "Yes" : "No"}
          </p>
          <p className="mb-2">
            <strong className="text-secondary">
              Tab Switching Restriction:
            </strong>{" "}
            {quiz.tabSwitchingRestriction ? "Yes" : "No"}
          </p>
          <p className="mb-2">
            <strong className="text-secondary">Custom Mode:</strong>{" "}
            {quiz.customMode ? "Yes" : "No"}
          </p>
          {quiz.customMode && (
            <div className="mb-4">
              <p className="mb-2">
                <strong className="text-secondary">Easy Time Limit:</strong>{" "}
                {quiz.timeLimits.easy} minutes
              </p>
              <p className="mb-2">
                <strong className="text-secondary">Medium Time Limit:</strong>{" "}
                {quiz.timeLimits.medium} minutes
              </p>
              <p className="mb-2">
                <strong className="text-secondary">
                  Difficult Time Limit:
                </strong>{" "}
                {quiz.timeLimits.difficult} minutes
              </p>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold mt-6 mb-4 text-primary">Questions</h3>
        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="bg-gray-50 shadow rounded p-4 mb-4 border border-gray-400"
          >
            <p className="mb-2">
              <strong className="text-secondary">
                Question {question.id}:
              </strong>{" "}
              {question.question}
            </p>
            <p className="mb-2">
              <strong className="text-secondary">Type:</strong> {question.type}
            </p>
            <p className="mb-2">
              <strong className="text-secondary">Points:</strong>{" "}
              {question.points}
            </p>
            {quiz.customMode && (
              <p className="mb-2">
                <strong className="text-secondary">Difficulty:</strong>{" "}
                {question.difficulty}
              </p>
            )}
            <p className="mb-2">
              <strong className="text-secondary">Options:</strong>
            </p>
            <ul className="list-disc ml-6">
              {question.options.map((option, oIndex) => (
                <li key={oIndex} className="mb-1">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <PrimaryButton text="Done" onClick={handleCancel} />
        <SecondaryButton
          text="Edit Quiz"
          onClick={() => navigate(`/admin/edit-quiz/${quizId}`)}
        />
      </div>
    </div>
  );
};

export default ViewQuiz;
