import { TextField } from "@mui/material";
import { format } from "date-fns";

const QuizInfoForm = ({ quiz, handleChange }) => {
  const formattedDeadline = quiz.deadline
    ? format(new Date(quiz.deadline), "yyyy-MM-dd")
    : "";

  return (
    <>
      <TextField
        label="Title"
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
      />
      <TextField
        label="Course"
        name="course"
        value={quiz.course}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Deadline"
        name="deadline"
        type="date"
        value={formattedDeadline}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Duration (minutes)"
        name="duration"
        type="number"
        value={quiz.duration}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default QuizInfoForm;
