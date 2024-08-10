import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  IconButton,
  Radio,
  Checkbox,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import PrimaryButton from "../../components/common/PrimaryButton";
import SecondaryButton from "../../components/common/SecondaryButton";
import ViewQuiz from "../../components/quiz/ViewQuiz";
import { baseUrl } from "../../constants/constants"; // Import baseUrl

const AddQuestions = ({ quizId, quiz, setQuiz, handleCancel }) => {
  const [questions, setQuestions] = useState([]);
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

  const removeQuestion = (qIndex) => {
    const updatedQuestions = questions.filter((_, index) => index !== qIndex);
    updatedQuestions.forEach((question, index) => {
      question.id = index + 1;
    });
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];

    if (updatedQuestions[qIndex].type === "trueFalse") {
      updatedQuestions[qIndex].options = ["True", "False"];
    }

    const selectedOption = updatedQuestions[qIndex].options[oIndex];

    if (updatedQuestions[qIndex].type === "singleChoice") {
      updatedQuestions[qIndex].correctAnswer = selectedOption;
    } else if (updatedQuestions[qIndex].type === "multipleChoice") {
      updatedQuestions[qIndex].correctAnswer =
        updatedQuestions[qIndex].correctAnswer || [];
      const optionIndex =
        updatedQuestions[qIndex].correctAnswer.indexOf(selectedOption);

      if (optionIndex > -1) {
        updatedQuestions[qIndex].correctAnswer.splice(optionIndex, 1);
      } else {
        updatedQuestions[qIndex].correctAnswer.push(selectedOption);
      }
    } else if (updatedQuestions[qIndex].type === "trueFalse") {
      updatedQuestions[qIndex].correctAnswer = selectedOption;
    }

    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "singleChoice",
        points: 3,
        difficulty: "easy",
        question: "",
        options: [""],
        correctAnswer: "",
      },
    ]);
  };

  const saveQuiz = async () => {
    try {
      const questionPromises = questions.map((question) => {
        const questionData = {
          ...question,
          quizId: quizId, // Use the quiz ID from the passed quiz prop
        };

        if (question.type === "trueFalse") {
          questionData.options = ["True", "False"];
          questionData.correctAnswer = question.correctAnswer;
        }

        return axios.post(`${baseUrl}/api/question/create`, questionData);
      });

      await Promise.all(questionPromises);

      // Update the quiz with the questions
      const updatedQuiz = { ...quiz, questions };
      setQuiz(updatedQuiz);
      setIsViewingQuiz(true);
    } catch (error) {
      console.error("Error saving questions:", error);
    }
  };

  if (isViewingQuiz) {
    return (
      <ViewQuiz
        quizId={quizId}
        quiz={quiz}
        handleCancel={handleCancel}
        questions={questions}
      />
    );
  }

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6 mb-4">
        <h2 className="text-xl font-bold mb-4" style={{ color: "#34495e" }}>
          Add Questions
        </h2>
        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="bg-gray-100 shadow rounded p-4 mb-4 border border-gray-400"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span
                  className="text-lg font-bold mr-4"
                  style={{ color: "#34495e" }}
                >
                  {`Question ${qIndex + 1}`}
                </span>
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
                {quiz.customMode && (
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
              <IconButton onClick={() => removeQuestion(qIndex)}>
                <Delete style={{ color: "red" }} />
              </IconButton>
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
                <Radio
                  value="True"
                  checked={question.correctAnswer === "True"}
                  onChange={() => handleCorrectOptionChange(qIndex, 0)}
                />
                <label className="ml-2">True</label>
                <Radio
                  value="False"
                  checked={question.correctAnswer === "False"}
                  onChange={() => handleCorrectOptionChange(qIndex, 1)}
                />
                <label className="ml-2">False</label>
              </div>
            ) : question.type === "shortAnswer" ? (
              <TextField
                label="Answer"
                value={question.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "correctAnswer", e.target.value)
                }
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
                    {question.type === "singleChoice" ? (
                      <Radio
                        checked={question.correctAnswer === option}
                        onChange={() =>
                          handleCorrectOptionChange(qIndex, oIndex)
                        }
                      />
                    ) : question.type === "multipleChoice" ? (
                      <Checkbox
                        checked={question.correctAnswer?.includes(option)}
                        onChange={() =>
                          handleCorrectOptionChange(qIndex, oIndex)
                        }
                      />
                    ) : null}
                    <IconButton onClick={() => removeOption(qIndex, oIndex)}>
                      <Delete style={{ color: "red" }} />
                    </IconButton>
                  </div>
                ))}
                <SecondaryButton
                  text="+ Add Choice"
                  onClick={() => addOption(qIndex)}
                  style={{
                    backgroundColor: "#B2C9AB",
                    transition: "background-color 0.3s",
                    marginTop: "10px",
                    color: "#fff",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#8FAB83")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#B2C9AB")
                  }
                />
              </div>
            )}
          </div>
        ))}
        <SecondaryButton
          text="Add Another Question"
          onClick={addQuestion}
          style={{
            backgroundColor: "#788AA3",
            transition: "background-color 0.3s",
            color: "#fff",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#5C6B83")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#788AA3")
          }
        />
      </div>
      <div className="flex justify-end space-x-4">
        <SecondaryButton text="Cancel" onClick={handleCancel} />
        <PrimaryButton text="Save Quiz" onClick={saveQuiz} />
      </div>
    </div>
  );
};

export default AddQuestions;
