import { useEffect, useState } from "react";
import axios from "axios";
import RecentActivitiesChart from "./charts/RecentActivitiesChart";

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/metrics")
      .then((response) => {
        setActivities(response.data.recentActivities);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the recent activities!",
          error
        );
      });
  }, []);

  const data = {
    labels: activities.map((activity, index) => `Activity ${index + 1}`),
    datasets: [
      {
        label: "Recent Activities",
        data: activities.map((activity) => activity.id),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
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
    <div className="bg-white shadow rounded p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
      <RecentActivitiesChart data={data} options={options} />
    </div>
  );
};

export default RecentActivities;
