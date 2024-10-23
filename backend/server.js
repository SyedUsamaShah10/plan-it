import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import taskRoutes from "./routes/task.routes.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", taskRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("app is running fine at PORT " + PORT);
});
