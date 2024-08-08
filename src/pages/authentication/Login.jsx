import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/smit-logo.png";
import graduateImg from "../../assets/HandsGraduate.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      const students = response.data;

      const student = students.find(
        (stu) => stu.username === username && stu.password === password
      );

      if (student) {
        alert("Login successful!");
        navigate("/quiz-cards"); // Navigate to the quiz page or wherever appropriate
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <main className="flex flex-col lg:flex-row items-center justify-center flex-1 w-full p-4 lg:p-10 max-w-screen-xl h-screen">
        <div className="lg:w-1/2 px-4 lg:px-6 flex flex-col justify-center items-center overflow-hidden">
          <header className="flex flex-col items-center w-full p-4">
            <span className="text-xl font-bold text-blue-600">
              <img className="w-32" src={logo} alt="" />
            </span>
            <Typography
              variant="h6"
              className="text-blue-600 border-blue-600 border px-4 py-2 rounded-md mt-4 text-center"
            >
              Welcome Back! <br /> Please login to your account.
            </Typography>
          </header>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4">
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <button
                type="button"
                className="text-blue-600 hover:underline focus:outline-none"
              >
                Reset Password
              </button>
            </div>

            {error && (
              <Typography variant="body2" color="error" className="mb-4">
                {error}
              </Typography>
            )}

            <Button type="submit" fullWidth variant="contained" color="primary">
              LOGIN
            </Button>
          </form>
        </div>

        <div className="hidden lg:block lg:w-1/2 px-4 lg:px-6 mt-10 lg:mt-0">
          <img
            src={graduateImg}
            alt="People with questions"
            className="max-w-full h-auto"
          />
        </div>
      </main>
    </div>
  );
};

export default Login;
