import { TaskDynamo } from "../data/taskDynamo.js";
const database = new TaskDynamo();

export class TaskController {

  static async list(req, res) {
    const tasks = await database.list();

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  }

  static async getById(req, res) {
    const { id } = req.params;

    const task = await database.select(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tarefa não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  }

  static async create(req, res) {
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "O título é obrigatório",
      });
    }

    const newTask = await database.create({
      title,
      description,
      completed,
    });

    return res.status(201).json({
      success: true,
      data: newTask,
      message: "Tarefa criada com sucesso",
    });
  }

  static async update(req, res) {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await database.update(id, updates);

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Tarefa não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedTask,
      message: "Tarefa atualizada com sucesso",
    });
  }

  static async delete(req, res) {
    const { id } = req.params;

    const deletedTask = await database.delete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Tarefa não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedTask,
      message: "Tarefa deletada com sucesso",
    });
  }
}