import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import QuizTableRow from "./QuizTableRow";

const QuizTable = ({ quizzes, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz) => (
            <QuizTableRow key={quiz.id} quiz={quiz} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuizTable;
