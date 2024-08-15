import express from "express";
import {
  login,
  signup,
} from "../controllers/auth.js";


const authRoutes = express.Router();

// required
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);

export default authRoutes;
