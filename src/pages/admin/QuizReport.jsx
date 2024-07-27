import { useEffect, useState } from "react";
import ReportTable from "../../components/report/ReportTable";
import axios from "axios";

const QuizReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/quizReports")
      .then((response) => {
        const reportsWithDetails = response.data.map(async (report) => {
          const quizResponse = await axios.get(
            `http://localhost:5000/quizzes/${report.quizId}`
          );
          const studentResponse = await axios.get(
            `http://localhost:5000/students/${report.studentId}`
          );
          return {
            ...report,
            quizTitle: quizResponse.data.title,
            studentName: studentResponse.data.name,
          };
        });

        Promise.all(reportsWithDetails).then((detailedReports) => {
          setReports(detailedReports);
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the quiz reports!", error);
      });
  }, []);

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Quiz Reports</h1>
        <ReportTable reports={reports} />
      </div>
    </div>
  );
};

export default QuizReport;
