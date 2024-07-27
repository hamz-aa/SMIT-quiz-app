import Metrics from "../../components/dashboard/Metrics";
import QuizPerformance from "../../components/dashboard/QuizPerformance";
import RecentActivities from "../../components/dashboard/RecentActivities";
import StudentEngagement from "../../components/dashboard/StudentEngagement";

const Dashboard = () => {
  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6">
        <Metrics />
        <RecentActivities />
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-2">
            <QuizPerformance />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <StudentEngagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
