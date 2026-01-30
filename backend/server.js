import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import boardRoutes from "./routes/boardRoute.js";
import todoRoutes from "./routes/todoRoutes.js";


dotenv.config({ path: "./config/.env" });


const app = express();



app.use(cors({
  origin: "https://assignment-todo-app-frontend1.onrender.com",
  credentials: true
}));
app.use(express.json());


connectDB();

// Routes 
app.use("/api/auth", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/todos", todoRoutes);


app.get("/", (req, res) => {
  res.send("Todo App Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
