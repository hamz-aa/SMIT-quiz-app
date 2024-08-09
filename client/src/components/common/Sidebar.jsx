const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul>
        <li className="mb-4">
          <a href="/">Dashboard</a>
        </li>
        <li className="mb-4">
          <a href="/quizzes">Manage Quizzes</a>
        </li>
        <li className="mb-4">
          <a href="/students">Manage Students</a>
        </li>
        <li className="mb-4">
          <a href="/reports">Quiz Reports</a>
        </li>
        <li className="mb-4">
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
