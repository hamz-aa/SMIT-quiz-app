import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ReportTableRow from "./ReportTableRow";

const ReportTable = ({ reports }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Quiz Title</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Date Taken</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <ReportTableRow key={report.id} report={report} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
