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
  TextField,
  Button,
  MenuItem,
  Select,
  IconButton,
  Grid,
  FormControl,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/constants";
import Papa from "papaparse";
import BatchFilterModal from "../../components/report/BatchFilterModal";
import ScoreFilterModal from "../../components/report/ScoreFilterModal";

const QuizReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    course: [],
    batch: "",
    instructor: [],
    averageScore: "",
  });
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/reports/grouped`);
        const groupedReports = response.data;
        setReports(groupedReports);
        setFilteredReports(groupedReports);
      } catch (error) {
        console.error("There was an error fetching the reports!", error);
      }
    };

    fetchReports();
  }, []);

  const handleRowClick = (quizId, batch, instructor) => {
    const encodedInstructor = encodeURIComponent(instructor);
    navigate(`/admin/quiz-reports/${quizId}/${batch}/${encodedInstructor}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    filterReports({ ...filters, [name]: value });
  };

  const handleCourseFilter = (event) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      course: value,
    }));

    filterReports({ ...filters, course: value });
  };

  const handleInstructorFilter = (event) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      instructor: value,
    }));

    filterReports({ ...filters, instructor: value });
  };

  const filterReports = (updatedFilters) => {
    const { title, course, batch, instructor, averageScore } = updatedFilters;
    const filtered = reports.filter((report) => {
      const matchTitle = report.title
        .toLowerCase()
        .includes(title.toLowerCase());
      const matchCourse = !course.length || course.includes(report.course);
      const matchBatch = batch
        ? report.batch.toString().includes(batch.toLowerCase())
        : true;
      const matchInstructor =
        !instructor.length || instructor.includes(report.instructor);
      const matchAvgScore = averageScore
        ? report.averageScore >= Number(averageScore.split("-")[0]) &&
          report.averageScore <= Number(averageScore.split("-")[1])
        : true;

      return (
        matchTitle &&
        matchCourse &&
        matchBatch &&
        matchInstructor &&
        matchAvgScore
      );
    });
    setFilteredReports(filtered);
  };

  const handleExport = () => {
    const csv = Papa.unparse(filteredReports);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "quiz_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueCourses = Array.from(
    new Set(reports.map((report) => report.course))
  );
  const uniqueInstructors = Array.from(
    new Set(reports.map((report) => report.instructor))
  );

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <Typography variant="h4" gutterBottom>
        Quiz Reports
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleExport}
        style={{ marginBottom: "20px" }}
      >
        Export
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f0f0f0" }}>
              <TableCell style={{ width: "15%" }}>
                <TextField
                  label="Title"
                  name="title"
                  value={filters.title}
                  onChange={handleFilterChange}
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: { fontWeight: "bold", fontSize: "14px" },
                  }}
                  style={{ maxHeight: "36px" }}
                />
              </TableCell>
              <TableCell style={{ width: "15%" }}>
                <FormControl variant="outlined" fullWidth>
                  <Select
                    label="Course"
                    multiple
                    value={filters.course}
                    onChange={handleCourseFilter}
                    inputProps={{
                      style: { fontWeight: "bold", fontSize: "14px" },
                    }}
                    style={{ maxHeight: "36px" }}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>Select Course</em>
                    </MenuItem>
                    {uniqueCourses.map((course, index) => (
                      <MenuItem key={index} value={course}>
                        {course}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell style={{ width: "15%" }}>
                <Grid container alignItems="center">
                  <TextField
                    label="Batch"
                    name="batch"
                    value={filters.batch}
                    onChange={handleFilterChange}
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      style: { fontWeight: "bold", fontSize: "14px" },
                    }}
                    style={{ maxHeight: "36px" }}
                  />
                  <IconButton onClick={() => setShowBatchModal(true)}>
                    <ArrowDropDown />
                  </IconButton>
                </Grid>
              </TableCell>
              <TableCell style={{ width: "15%" }}>
                <FormControl variant="outlined" fullWidth>
                  <Select
                    label="Instructor"
                    multiple
                    value={filters.instructor}
                    onChange={handleInstructorFilter}
                    inputProps={{
                      style: { fontWeight: "bold", fontSize: "14px" },
                    }}
                    style={{ maxHeight: "36px" }}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>Select Instructor</em>
                    </MenuItem>
                    {uniqueInstructors.map((instructor, index) => (
                      <MenuItem key={index} value={instructor}>
                        {instructor}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell style={{ width: "15%" }}>
                <Grid container alignItems="center">
                  <TextField
                    label="Avg. Score"
                    name="averageScore"
                    value={filters.averageScore}
                    onChange={handleFilterChange}
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      style: { fontWeight: "bold", fontSize: "14px" },
                    }}
                    style={{ maxHeight: "36px" }}
                  />
                  <IconButton onClick={() => setShowScoreModal(true)}>
                    <ArrowDropDown />
                  </IconButton>
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report, index) => (
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
      <BatchFilterModal
        open={showBatchModal}
        onClose={() => setShowBatchModal(false)}
        applyFilter={(batchFrom, batchTo) => {
          setFilters((prevFilters) => ({
            ...prevFilters,
            batch: `${batchFrom}-${batchTo}`,
          }));
          filterReports({ ...filters, batch: `${batchFrom}-${batchTo}` });
        }}
      />
      <ScoreFilterModal
        open={showScoreModal}
        onClose={() => setShowScoreModal(false)}
        applyFilter={(scoreFrom, scoreTo) => {
          setFilters((prevFilters) => ({
            ...prevFilters,
            averageScore: `${scoreFrom}-${scoreTo}`,
          }));
          filterReports({
            ...filters,
            averageScore: `${scoreFrom}-${scoreTo}`,
          });
        }}
      />
    </div>
  );
};

export default QuizReports;
