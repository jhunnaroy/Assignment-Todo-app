import { useEffect, useState } from "react";
import API from "../api/api";
import "./Todos.css";

const Todos = ({ board }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await API.get(`/todos/${board._id}`);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await API.post("/todos", {
      title,
      board: board._id,
    });
    setTitle("");
    fetchTodos();
  };

  
  const deleteTodo = async (id) => {
    if (!window.confirm("Delete this todo?")) return;
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, [board]);

  return (
    <div className="todos-container">
      <h3>Todos – {board.name}</h3>

      <input
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title}
            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => deleteTodo(todo._id)}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
