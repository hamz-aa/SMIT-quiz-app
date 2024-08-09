import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { format } from "date-fns";

const QuizTable = ({ quizzes, onEdit, onDelete, onView }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#f0f0f0" }}>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Course</strong>
            </TableCell>
            <TableCell>
              <strong>Duration</strong>
            </TableCell>
            <TableCell>
              <strong>Deadline</strong>
            </TableCell>
            <TableCell>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow
              key={quiz.id}
              hover
              onClick={() => onView(quiz.id)}
              style={{ cursor: "pointer" }}
            >
              <TableCell>{quiz.title}</TableCell>
              <TableCell>{quiz.course}</TableCell>
              <TableCell>{quiz.duration} mins</TableCell>
              <TableCell>
                {format(new Date(quiz.deadline), "dd MMM yyyy")}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <IconButton
                  onClick={() => onEdit(quiz.id)}
                  style={{ color: "yellow" }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(quiz.id)}
                  style={{ color: "red" }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuizTable;
