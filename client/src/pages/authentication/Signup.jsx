import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/smit-logo.png";
import graduateImg from "../../assets/HandsGraduate.svg";
import { baseUrl } from "../../constants/constants";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [batch] = useState(new Date().getFullYear()); // Keeping the batch fixed to the current year
  const [instructor, setInstructor] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password || !course || !instructor) {
      setError("Please fill in all fields");
      return;
    }

    const newStudent = {
      name: username,
      email,
      password,
      course,
      batch,
      instructor,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/signup`,
        newStudent
      );

      if (response.data.success) {
        navigate("/login");
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("There was an error signing up!", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <main className="flex flex-col lg:flex-row items-center justify-center flex-1 w-full p-4 lg:p-10 max-w-screen-xl">
        <div className="lg:w-1/2 px-4 lg:px-6 flex flex-col justify-center items-center overflow-hidden">
          <header className="flex flex-col items-center w-full p-4">
            <span className="text-xl font-bold text-blue-600">
              <img className="w-32" src={logo} alt="SMIT Logo" />
            </span>
            <Typography
              variant="h4"
              className="text-blue-600 border-blue-600 border px-4 py-2 rounded-md mt-4 text-center"
            >
              Sign Up for an Account
            </Typography>
          </header>
          <form className="mt-8 w-full max-w-md">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Course</InputLabel>
              <Select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                label="Course"
                required
              >
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="English">English</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Batch"
              variant="outlined"
              fullWidth
              value={batch}
              margin="normal"
              required
              disabled
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Instructor</InputLabel>
              <Select
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                label="Instructor"
                required
              >
                <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                <MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>
                <MenuItem value="Dr. Brown">Dr. Brown</MenuItem>
              </Select>
            </FormControl>
            {error && (
              <Typography color="error" className="mt-2">
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              onClick={handleSignup}
            >
              SIGN UP
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

export default Signup;
