import { TableRow, TableCell, Button } from "@mui/material";

const StudentTableRow = ({ student, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{student.name}</TableCell>
      <TableCell>{student.email}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(student)}
          className="mr-2"
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default StudentTableRow;
