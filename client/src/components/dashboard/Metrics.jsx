import { useEffect, useState } from "react";
import axios from "axios";
import MetricsChart from "./charts/MetricsChart";

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

  const data = {
    labels: ["Total Quizzes", "Total Students", "Average Score"],
    datasets: [
      {
        label: "Metrics",
        data: [
          metrics.totalQuizzes,
          metrics.totalStudents,
          metrics.averageScore,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Metrics</h2>
      <MetricsChart data={data} options={options} />
    </div>
  );
};

export default Metrics;
