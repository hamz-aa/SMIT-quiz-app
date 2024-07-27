import { useState } from "react";
import { TextField, Select, MenuItem, IconButton, Button } from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import PrimaryButton from "../../../components/common/PrimaryButton";
import SecondaryButton from "../../../components/common/SecondaryButton";
import ViewQuiz from "./ViewQuiz";

const AddQuestions = ({ quiz, setQuiz, handleCreateQuiz, handleCancel }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "singleChoice",
      points: 3,
      difficulty: "easy",
      question: "",
      options: [""],
    },
  ]);
  const [isViewingQuiz, setIsViewingQuiz] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        type: "singleChoice",
        points: 3,
        difficulty: "easy",
        question: "",
        options: [""],
      },
    ]);
  };

  const saveQuiz = () => {
    setQuiz({ ...quiz, questions });
    setIsViewingQuiz(true);
  };

  if (isViewingQuiz) {
    return <ViewQuiz quiz={quiz} handleCancel={handleCancel} />;
  }

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6 mb-4">
        <h2 className="text-xl font-bold mb-4">Add Questions</h2>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-white shadow rounded p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-lg font-bold mr-4">{`Question ${question.id}`}</span>
                <Select
                  value={question.type}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "type", e.target.value)
                  }
                  style={{ marginRight: "16px" }}
                >
                  <MenuItem value="singleChoice">Single Choice</MenuItem>
                  <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                  <MenuItem value="trueFalse">True/False</MenuItem>
                  <MenuItem value="shortAnswer">Short Answer</MenuItem>
                </Select>
                <TextField
                  label="Points"
                  type="number"
                  value={question.points}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "points", e.target.value)
                  }
                  style={{ marginRight: "16px" }}
                />
                {quiz.custom_mode && (
                  <Select
                    value={question.difficulty}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "difficulty", e.target.value)
                    }
                    style={{ marginRight: "16px" }}
                  >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="difficult">Difficult</MenuItem>
                  </Select>
                )}
              </div>
            </div>
            <TextField
              label="Question"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            {question.type === "trueFalse" ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`true-${qIndex}`}
                    name={`question-${qIndex}`}
                    value="true"
                  />
                  <label htmlFor={`true-${qIndex}`} className="ml-2">
                    True
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`false-${qIndex}`}
                    name={`question-${qIndex}`}
                    value="false"
                  />
                  <label htmlFor={`false-${qIndex}`} className="ml-2">
                    False
                  </label>
                </div>
              </div>
            ) : question.type === "shortAnswer" ? (
              <TextField
                label="Answer"
                value={question.options[0]}
                onChange={(e) => handleOptionChange(qIndex, 0, e.target.value)}
                fullWidth
                multiline
                rows={3}
                margin="normal"
              />
            ) : (
              <div>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center mb-2">
                    <TextField
                      label={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      fullWidth
                      margin="normal"
                    />
                    <IconButton onClick={() => removeOption(qIndex, oIndex)}>
                      <Delete style={{ color: "red" }} />
                    </IconButton>
                  </div>
                ))}
                <SecondaryButton
                  text="+ Add Choice"
                  onClick={() => addOption(qIndex)}
                />
              </div>
            )}
          </div>
        ))}
        <SecondaryButton text="Add Another Question" onClick={addQuestion} />
      </div>
      <div className="flex justify-end space-x-4">
        <PrimaryButton text="Cancel" onClick={handleCancel} />
        <SecondaryButton text="Create Quiz" onClick={saveQuiz} />
      </div>
    </div>
  );
};

export default AddQuestions;
