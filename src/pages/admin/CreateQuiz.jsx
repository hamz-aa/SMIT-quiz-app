import { useState } from "react";
import QuestionForm from "../../components/quiz/QuestionForm";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { text: "", type: "multipleChoice" }],
    });
  };

  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = quiz.questions.map((question, i) =>
      i === index ? updatedQuestion : question
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/quizzes", quiz)
      .then(() => {
        setQuiz({ title: "", description: "", questions: [] });
        alert("Quiz created successfully!");
      })
      .catch((error) => {
        console.error("There was an error creating the quiz!", error);
      });
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <form className="bg-white shadow rounded p-6" onSubmit={handleSubmit}>
        <TextField
          label="Quiz Title"
          name="title"
          value={quiz.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={quiz.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        {quiz.questions.map((question, index) => (
          <QuestionForm
            key={index}
            question={question}
            index={index}
            updateQuestion={updateQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))}
        <Button variant="contained" color="primary" onClick={addQuestion}>
          Add Question
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="ml-4"
        >
          Save Quiz
        </Button>
      </form>
    </div>
  );
};

export default CreateQuiz;
