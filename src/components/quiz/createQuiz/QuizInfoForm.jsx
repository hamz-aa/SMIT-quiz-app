import { TextField } from "@mui/material";

const QuizInfoForm = ({ quiz, handleChange }) => {
  return (
    <>
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
        type="datetime-local"
        value={quiz.deadline}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
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
