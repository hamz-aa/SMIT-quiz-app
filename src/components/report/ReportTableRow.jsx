import { TableRow, TableCell } from "@mui/material";

const ReportTableRow = ({ report }) => {
  return (
    <TableRow>
      <TableCell>{report.quizTitle}</TableCell>
      <TableCell>{report.studentName}</TableCell>
      <TableCell>{report.score}</TableCell>
      <TableCell>{new Date(report.dateTaken).toLocaleDateString()}</TableCell>
    </TableRow>
  );
};

export default ReportTableRow;
