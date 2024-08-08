import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin/Dashboard";
import CreateQuiz from "./pages/admin/CreateQuiz";
import ManageQuiz from "./pages/admin/ManageQuiz";
import ManageStudents from "./pages/admin/ManageStudents";
import QuizReports from "./pages/admin/QuizReports";
import Settings from "./pages/admin/Settings";
import Layout from "./layout/Layout";
import EditQuiz from "./pages/admin/EditQuiz";
import QuizReportDetails from "./pages/admin/QuizReportDetails";
import QuizCard from "./pages/student/QuizCard";
import Quiz from "./pages/student/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* admin routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route exact path="/dashboard" element={<AdminDashboard />} />
          <Route exact path="/create-quiz" element={<CreateQuiz />} />
          <Route exact path="/manage-quiz" element={<ManageQuiz />} />
          <Route exact path="/edit-quiz/:id" element={<EditQuiz />} />
          <Route exact path="/manage-students" element={<ManageStudents />} />
          <Route exact path="/quiz-reports" element={<QuizReports />} />
          <Route
            exact
            path="/quiz-reports/:quizId/:batch/:instructor"
            element={<QuizReportDetails />}
          />
          <Route exact path="/settings" element={<Settings />} />
        </Route>
        {/* student routes */}
        <Route exact path="/student/quizzes" element={<QuizCard />} />
        <Route exact path="/student/quizzes/:quizId" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
