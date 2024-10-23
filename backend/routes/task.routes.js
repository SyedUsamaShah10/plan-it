import express from "express";
import {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/createTodo", addTask);
router.delete("/deleteTodo/:id", deleteTask);
router.put("/updateTodo/:id", updateTask);

export default router;
