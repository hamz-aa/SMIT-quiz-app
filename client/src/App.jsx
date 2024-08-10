import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { UserContext } from "./contexts/UserContext"; // Correct context import
import { useContext } from "react";

function App() {
  const { isLoggedIn, isAdmin } = useContext(UserContext); // Access the context values

  const ProtectedRoute = ({ element, isAdminRoute = false }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    if (isAdminRoute && !isAdmin) {
      return <Navigate to="/student/quizzes" />;
    }
    if (!isAdminRoute && isAdmin) {
      return <Navigate to="/admin" />;
    }
    return element;
  };

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
          <Route
            exact
            path="/admin"
            element={
              <ProtectedRoute
                element={<AdminDashboard />}
                isAdminRoute={true}
              />
            }
          />
          <Route
            exact
            path="/admin/create-quiz"
            element={<ProtectedRoute element={<CreateQuiz />} isAdminRoute />}
          />
          <Route
            exact
            path="/admin/manage-quiz"
            element={<ProtectedRoute element={<ManageQuiz />} isAdminRoute />}
          />
          <Route
            exact
            path="/admin/edit-quiz/:id"
            element={<ProtectedRoute element={<EditQuiz />} isAdminRoute />}
          />
          <Route
            exact
            path="/admin/manage-students"
            element={
              <ProtectedRoute element={<ManageStudents />} isAdminRoute />
            }
          />
          <Route
            exact
            path="/admin/quiz-reports"
            element={<ProtectedRoute element={<QuizReports />} isAdminRoute />}
          />
          <Route
            exact
            path="/admin/quiz-reports/:quizId/:batch/:instructor"
            element={
              <ProtectedRoute element={<QuizReportDetails />} isAdminRoute />
            }
          />
          <Route
            exact
            path="/admin/settings"
            element={<ProtectedRoute element={<Settings />} isAdminRoute />}
          />
        </Route>
        {/* student routes */}
        <Route
          exact
          path="/student/quizzes"
          element={<ProtectedRoute element={<QuizCard />} />}
        />
        <Route
          exact
          path="/student/quizzes/:quizId"
          element={<ProtectedRoute element={<Quiz />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
