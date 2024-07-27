import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="bg-white shadow rounded p-4 mt-4">
      <h2 className="text-xl font-bold">Recent Activities</h2>
      <ul className="mt-2">
        {activities.map((activity) => (
          <li key={activity.id} className="border-b py-2">
            {activity.activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
