import Todo from "../models/Todo.js";
import Board from "../models/Board.js";

export const createTodo = async (req, res) => {
  try {
    console.log( req.body);
    console.log( req.user);

    const { title, board } = req.body;

    if (!title || !board) {
      return res.status(400).json({ message: "Title and board are required" });
    }

    const todo = await Todo.create({
      title,
      board,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};





export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ board: req.params.boardId });
    res.json(todos);
  } catch (error) {
      
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Todo update failed" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Todo deletion failed" });
  }
};
