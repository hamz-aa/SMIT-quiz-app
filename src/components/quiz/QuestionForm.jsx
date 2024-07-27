import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";

const QuestionForm = ({ question, index, updateQuestion, deleteQuestion }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateQuestion(index, { ...question, [name]: value });
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <TextField
        label="Question"
        name="text"
        value={question.text}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Type"
        name="type"
        select
        value={question.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
        <MenuItem value="trueFalse">True/False</MenuItem>
        <MenuItem value="shortAnswer">Short Answer</MenuItem>
      </TextField>
      <Button color="secondary" onClick={() => deleteQuestion(index)}>
        Delete Question
      </Button>
    </div>
  );
};

export default QuestionForm;
