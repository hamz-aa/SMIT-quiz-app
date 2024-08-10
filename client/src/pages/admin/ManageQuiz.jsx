import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuizTable from "../../components/common/QuizTable";
import ViewQuiz from "../../components/quiz/ViewQuiz";
import { baseUrl } from "../../constants/constants";

const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // To pass the selected quiz data
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/quiz/all`)
      .then((response) => {
        setQuizzes(response.data.data);
        setFilteredQuizzes(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the quizzes!", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    filterQuizzes(value, filter);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    filterQuizzes(search, value);
  };

  const filterQuizzes = (search, filter) => {
    let filtered = quizzes;

    if (search) {
      filtered = filtered.filter((quiz) =>
        quiz.title.toLowerCase().includes(search)
      );
    }

    if (filter === "due") {
      filtered = filtered.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
    } else if (filter === "past") {
      const now = new Date();
      filtered = filtered.filter((quiz) => new Date(quiz.deadline) < now);
    }

    setFilteredQuizzes(filtered);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/quiz/remove/${id}`)
      .then(() => {
        const updatedQuizzes = quizzes.filter((quiz) => quiz._id !== id);
        setQuizzes(updatedQuizzes);
        setFilteredQuizzes(updatedQuizzes);
      })
      .catch((error) => {
        console.error("There was an error deleting the quiz!", error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-quiz/${id}`);
  };

  const handleView = (id) => {
    const quiz = quizzes.find((quiz) => quiz._id === id);
    setSelectedQuizId(id);
    setSelectedQuiz(quiz); // Store the selected quiz data
  };

  const handleCancelView = () => {
    setSelectedQuizId(null);
    setSelectedQuiz(null); // Reset selected quiz data
  };

  if (selectedQuizId) {
    return (
      <ViewQuiz
        quizId={selectedQuizId}
        quiz={selectedQuiz}
        handleCancel={handleCancelView}
      />
    );
  }

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="flex justify-between mb-4">
        <TextField
          label="Search by Title"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
          style={{ width: "40%" }}
        />
        <Select
          value={filter}
          onChange={handleFilterChange}
          displayEmpty
          variant="outlined"
          style={{ width: "30%" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="due">Due Date</MenuItem>
          <MenuItem value="past">Past Due</MenuItem>
        </Select>
      </div>
      <QuizTable
        quizzes={filteredQuizzes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
};

export default ManageQuiz;
