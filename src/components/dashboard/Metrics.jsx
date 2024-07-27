import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import axios from "axios";

const Metrics = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/metrics")
      .then((response) => {
        setMetrics(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the metrics!", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard title="Total Quizzes" value={metrics.totalQuizzes} />
      <DashboardCard title="Total Students" value={metrics.totalStudents} />
      <DashboardCard title="Average Score" value={metrics.averageScore + "%"} />
    </div>
  );
};

export default Metrics;
