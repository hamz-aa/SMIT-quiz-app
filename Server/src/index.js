//  mongoDB connection
import "./config/databaseMongodb.js";

import express from "express";
import { quizRouter } from "./routes/quizRouter.js";
import authRoutes from "./routes/authRoutes.js";
import { initializeLogger } from "./helpers/logger.js";
import { environments } from "./environments/environments.js";
import cors from "cors";
import questionRouter from "./routes/questionRoutes.js";
import quizReportRouter from "./routes/quizReportRoute.js";

const PORT = environments.PORT;

const app = express();

export const logger = initializeLogger();

app.use(express.json());

app.use(cors());

// required
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRouter);
app.use("/api/question", questionRouter);
app.use("/api/reports", quizReportRouter);


app.listen(PORT, () => {
  console.log("server is running on PORT " + PORT);
});
