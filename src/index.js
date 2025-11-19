import express from "express";
import { TaskController } from "./controllers/taskController.js";

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Todo API está rodando!",
    version: "1.0.0",
  });
});

// Rotes
app.get("/api/tasks", TaskController.list);
app.get("/api/tasks/:id", TaskController.getById);
app.post("/api/tasks", TaskController.create);
app.put("/api/tasks/:id", TaskController.update);
app.delete("/api/tasks/:id", TaskController.delete);

app.listen(3000);