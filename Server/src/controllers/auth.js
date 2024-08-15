import { sendMessage } from "../helpers/sendMessage.js";
import { studentService } from "../service/student.service.js";
import { StudentModel } from "../models/studentModel.js";

const { createStudentService } = new studentService();

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, course, batch, instructor } = req.body;

    if (!name || !email || !password || !course || !batch || !instructor)
      return res.status(400).json("Please fill all fields");

    const result = await createStudentService(req);
    res.status(200).json(result);
    if (result?.status) {
    } else {
      return res.status(403).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please fill all fields");
    }

    const student = await StudentModel.findOne({ email });
    const isCorrect = student.password === password;
    if (isCorrect) {
      res.status(200).json(student);
    } else {
      res.status(403).json("Wrong credentials!");
    }
    // await logInService(req, res);
  } catch (error) {
    res.status(500).json(sendMessage(false, "Internal server error"));
  }
};
