import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const StudentForm = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enrolledQuizzes: [],
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="bg-white shadow rounded p-6" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="mr-2"
      >
        Save
      </Button>
      <Button variant="contained" color="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
};

export default StudentForm;
