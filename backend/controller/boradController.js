import Board from "../models/Board.js";

export const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      name: req.body.name,
      user: req.user.id,
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Board creation failed" });
  }
};

export const getBoards = async (req, res) => {
  console.log( req.user);

  const boards = await Board.find({ user: req.user.id });
  res.json(boards);
};


export const deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Board deletion failed" });
  }
};
