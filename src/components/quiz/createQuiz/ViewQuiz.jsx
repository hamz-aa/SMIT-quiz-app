import React from "react";
import PrimaryButton from "../../../components/common/PrimaryButton";
import SecondaryButton from "../../../components/common/SecondaryButton";

const ViewQuiz = ({ quiz, handleCancel }) => {
  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6 mb-4">
        <h2 className="text-2xl font-bold mb-4">Quiz Overview</h2>
        <p>
          <strong>Title:</strong> {quiz.title}
        </p>
        <p>
          <strong>Description:</strong> {quiz.description}
        </p>
        <p>
          <strong>Course:</strong> {quiz.course}
        </p>
        <p>
          <strong>Deadline:</strong> {quiz.deadline}
        </p>
        <p>
          <strong>Duration:</strong> {quiz.duration} minutes
        </p>
        <p>
          <strong>Location Restriction:</strong>{" "}
          {quiz.location_restriction ? "Yes" : "No"}
        </p>
        <p>
          <strong>Tab Switching Restriction:</strong>{" "}
          {quiz.tab_switching_restriction ? "Yes" : "No"}
        </p>
        <p>
          <strong>Custom Mode:</strong> {quiz.custom_mode ? "Yes" : "No"}
        </p>
        {quiz.custom_mode && (
          <div>
            <p>
              <strong>Easy Time Limit:</strong> {quiz.time_limits.easy} minutes
            </p>
            <p>
              <strong>Medium Time Limit:</strong> {quiz.time_limits.medium}{" "}
              minutes
            </p>
            <p>
              <strong>Difficult Time Limit:</strong>{" "}
              {quiz.time_limits.difficult} minutes
            </p>
          </div>
        )}
        <h3 className="text-xl font-bold mt-6 mb-4">Questions</h3>
        {quiz.questions.map((question, qIndex) => (
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
            {quiz.custom_mode && (
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
