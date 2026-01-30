import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controller/todoController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// create todo
router.post("/", authMiddleware, createTodo);

// get todos of a board
router.get("/:boardId", authMiddleware, getTodos);

// update todo
router.put("/:id", authMiddleware, updateTodo);

// delete todo
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
