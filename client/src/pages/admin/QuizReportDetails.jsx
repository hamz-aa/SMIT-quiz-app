import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const QuizReportDetails = () => {
  const { quizId, batch, instructor } = useParams();
  const decodedInstructor = decodeURIComponent(instructor);
  const [quiz, setQuiz] = useState(null);
  const [students, setStudents] = useState([]);
  const [quizReports, setQuizReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizResponse = await axios.get(
          `http://localhost:5000/quizzes/${quizId}`
        );
        const studentResponse = await axios.get(
          `http://localhost:5000/students`
        );
        const reportResponse = await axios.get(
          `http://localhost:5000/quizReports`
        );

        const quiz = quizResponse.data;
        const students = studentResponse.data.filter(
          (student) =>
            student.batch === batch && student.instructor === decodedInstructor
        );
        const quizReports = reportResponse.data.filter(
          (report) =>
            report.quizId === quizId &&
            students.some(
              (student) => student.id.toString() === report.studentId.toString()
            )
        );

        setQuiz(quiz);
        setStudents(students);
        setQuizReports(quizReports);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, [quizId, batch, decodedInstructor]);

  return (
    <div className="flex-1 p-4 bg-gray-100">
      {quiz && (
        <>
          <Typography variant="h4" gutterBottom>
            {quiz.title} - {quiz.course}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Batch: {batch} | Instructor: {decodedInstructor}
          </Typography>
        </>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f0f0f0" }}>
              <TableCell>
                <strong>Student Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Time Taken</strong>
              </TableCell>
              <TableCell>
                <strong>Score</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizReports.map((report, index) => {
              const student = students.find(
                (student) =>
                  student.id.toString() === report.studentId.toString()
              );
              return (
                <TableRow key={index}>
                  <TableCell>{student?.name}</TableCell>
                  <TableCell>{student?.email}</TableCell>
                  <TableCell>{report.timeTaken}</TableCell>
                  <TableCell>{report.score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuizReportDetails;
