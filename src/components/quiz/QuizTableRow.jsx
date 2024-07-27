import { TableRow, TableCell, Button } from "@mui/material";
import { Link } from "react-router-dom";

const QuizTableRow = ({ quiz, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{quiz.title}</TableCell>
      <TableCell>{quiz.description}</TableCell>
      <TableCell>
        <Button
          component={Link}
          to={`/edit-quiz/${quiz.id}`}
          variant="contained"
          color="primary"
          className="mr-2"
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDelete(quiz.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default QuizTableRow;
