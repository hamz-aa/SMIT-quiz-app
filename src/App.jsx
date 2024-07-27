import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin/Dashboard";
import CreateQuiz from "./pages/admin/CreateQuiz";
import ManageQuiz from "./pages/admin/ManageQuiz";
import ManageStudents from "./pages/admin/ManageStudents";
import QuizReport from "./pages/admin/QuizReport";
import Settings from "./pages/admin/Settings";
import Layout from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route exact path="/dashboard" element={<AdminDashboard />} />
          <Route exact path="/create-quiz" element={<CreateQuiz />} />
          <Route exact path="/manage-quiz" element={<ManageQuiz />} />
          <Route exact path="/manage-students" element={<ManageStudents />} />
          <Route exact path="/quiz-reports" element={<QuizReport />} />
          <Route exact path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
