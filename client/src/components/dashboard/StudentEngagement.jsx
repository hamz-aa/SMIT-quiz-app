import { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "./charts/PieChart";

const StudentEngagement = () => {
  const [engagementData, setEngagementData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          const highEngagement = data.filter(
            (student) => student.engagement === "high"
          ).length;
          const mediumEngagement = data.filter(
            (student) => student.engagement === "medium"
          ).length;
          const lowEngagement = data.filter(
            (student) => student.engagement === "low"
          ).length;

          setEngagementData({
            labels: ["High", "Medium", "Low"],
            datasets: [
              {
                label: "Student Engagement",
                data: [highEngagement, mediumEngagement, lowEngagement],
                backgroundColor: [
                  "rgba(44, 62, 80, 0.6)",
                  "rgba(39, 174, 96, 0.6)",
                  "rgba(142, 68, 173, 0.6)",
                ],
                borderColor: [
                  "rgba(44, 62, 80, 1)",
                  "rgba(39, 174, 96, 1)",
                  "rgba(142, 68, 173, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the student data!", error);
      });
  }, []);

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Student Engagement</h2>
      {engagementData ? (
        <PieChart data={engagementData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StudentEngagement;
