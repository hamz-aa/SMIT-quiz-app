import Metrics from "../../components/dashboard/Metrics";
import RecentActivities from "../../components/dashboard/RecentActivities";

const Dashboard = () => {
  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6">
        <Metrics />
        <RecentActivities />
      </div>
    </div>
  );
};

export default Dashboard;
