import { useEffect, useState } from "react";
import API from "../api/api";
import Todos from "./Todos";
import "./Boards.css";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);

  //  Fetch boards
  const fetchBoards = async () => {
    try {
      const res = await API.get("/boards");
      setBoards(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  //  Create board
  const createBoard = async () => {
    if (!name.trim()) return alert("Enter board name");

    try {
      await API.post("/boards", { name });
      setName("");
      fetchBoards();
    } catch {
      alert("Board creation failed");
    }
  };

  //  Delete board
  const deleteBoard = async (id) => {
    if (!window.confirm("Delete this board?")) return;

    try {
      await API.delete(`/boards/${id}`);
      if (selectedBoard?._id === id) setSelectedBoard(null);
      fetchBoards();
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="boards-container">
      <h2 className="boards-title">My Boards</h2>

      
      <div className="board-create">
        <input
          className="board-input"
          placeholder="New board name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="create-btn" onClick={createBoard}>
          Create
        </button>
      </div>

      
      <div className="boards-list">
        {boards.length === 0 && (
          <p className="empty-text">No boards found</p>
        )}

        {boards.map((b) => (
          <div
            key={b._id}
            className={`board-item ${
              selectedBoard?._id === b._id ? "active" : ""
            }`}
          >
            <span onClick={() => setSelectedBoard(b)}>{b.name}</span>

            <button
              className="delete-btn"
              onClick={() => deleteBoard(b._id)}
            >
              DELETE
            </button>
          </div>
        ))}
      </div>

      {/* Todos */}
      {selectedBoard && <Todos board={selectedBoard} />}
    </div>
  );
};

export default Boards;
