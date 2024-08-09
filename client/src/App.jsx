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
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Home from "./pages/homepage/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* homepage */}
        <Route exact path="/" element={<Home />} />
        {/* auth routes */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        {/* admin routes */}
        <Route element={<Layout />}>
          <Route exact path="/admin" element={<AdminDashboard />} />
          <Route exact path="/admin/create-quiz" element={<CreateQuiz />} />
          <Route exact path="/admin/manage-quiz" element={<ManageQuiz />} />
          <Route exact path="/admin/edit-quiz/:id" element={<EditQuiz />} />
          <Route
            exact
            path="/admin/manage-students"
            element={<ManageStudents />}
          />
          <Route exact path="/admin/quiz-reports" element={<QuizReports />} />
          <Route
            exact
            path="/admin/quiz-reports/:quizId/:batch/:instructor"
            element={<QuizReportDetails />}
          />
          <Route exact path="/admin/settings" element={<Settings />} />
        </Route>
        {/* student routes */}
        <Route exact path="/student/quizzes" element={<QuizCard />} />
        <Route exact path="/student/quizzes/:quizId" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
