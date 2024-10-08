import { sendMessage } from "../helpers/sendMessage.js";
import { logger } from "../index.js";
import { QuizService } from "../service/quizService.js";
const {
  createQuizService,
  updateQuizService,
  deleteQuizService,
  getQuizService,
  getSingleQuizService,
} = new QuizService();

export const createQuiz = async (req, res) => {
  try {
    const result = await createQuizService(req);
    if (result?.status) {
      res.status(200).json(sendMessage(true, result.message, result.data));
    } else {
      return res.status(403).json(result);
    }
  } catch (error) {
    res.status(500).json(sendMessage(false, "Internal server error", error));
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const result = await updateQuizService(req);
    if (result?.status) {
      res.status(200).json(sendMessage(true, result.message, result.data));
    } else {
      return res.status(403).json(result);
    }
  } catch (error) {
    logger.error("Internal server error", { body: error });
    res.status(500).json(sendMessage(false, "Internal server error", error));
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const result = await deleteQuizService(req);
    if (result?.status) {
      res.status(200).json(sendMessage(true, result.message, result.data));
    } else {
      return res.status(403).json(result);
    }
  } catch (error) {
    logger.error("Internal server error", { body: error });
    res.status(500).json(sendMessage(false, "Internal server error", error));
  }
};

export const getAllQuiz = async (req, res) => {
  try {
    const result = await getQuizService(req);
    if (result?.status) {
      res.status(200).json(sendMessage(true, result.message, result.data));
    } else {
      return res.status(403).json(result);
    }
  } catch (error) {
    logger.error("Internal server error", { body: error });
    res.status(500).json(sendMessage(false, "Internal server error", error));
  }
};

export const getSingleQuiz = async (req, res) => {
  try {
    const result = await getSingleQuizService(req);
    if (result?.status) {
      res.status(200).json(sendMessage(true, result.message, result.data));
    } else {
      return res.status(403).json(result);
    }
  } catch (error) {
    logger.error("Internal server error", { body: error });
    res.status(500).json(sendMessage(false, "Internal server error", error));
  }
};
