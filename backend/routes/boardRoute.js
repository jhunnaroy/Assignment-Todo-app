import express from "express";
import {
  createBoard,
  getBoards,
  deleteBoard,
} from "../controller/boradController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// create board
router.post("/", authMiddleware, createBoard);

// get all boards 
router.get("/", authMiddleware, getBoards);

// delete board
router.delete("/:id", authMiddleware, deleteBoard);

export default router;
