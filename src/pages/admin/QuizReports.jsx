import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { groupReportsByBatchAndInstructor } from "../../utils/utils";

const QuizReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const quizResponse = await axios.get("http://localhost:5000/quizzes");
        const studentResponse = await axios.get(
          "http://localhost:5000/students"
        );
        const reportResponse = await axios.get(
          "http://localhost:5000/quizReports"
        );

        const quizzes = quizResponse.data;
        const students = studentResponse.data;
        const quizReports = reportResponse.data;

        const groupedReports = groupReportsByBatchAndInstructor(
          quizzes,
          students,
          quizReports
        );

        setReports(groupedReports);
      } catch (error) {
        console.error("There was an error fetching the reports!", error);
      }
    };

    fetchReports();
  }, []);

  const handleRowClick = (quizId, batch, instructor) => {
    const encodedInstructor = encodeURIComponent(instructor);
    navigate(`/quiz-reports/${quizId}/${batch}/${encodedInstructor}`);
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <Typography variant="h4" gutterBottom>
        Quiz Reports
      </Typography>
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
                <strong>Batch</strong>
              </TableCell>
              <TableCell>
                <strong>Instructor</strong>
              </TableCell>
              <TableCell>
                <strong>Average Score</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow
                key={index}
                hover
                onClick={() =>
                  handleRowClick(report.quizId, report.batch, report.instructor)
                }
                style={{ cursor: "pointer" }}
              >
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.course}</TableCell>
                <TableCell>{report.batch}</TableCell>
                <TableCell>{report.instructor}</TableCell>
                <TableCell>{report.averageScore.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuizReports;
