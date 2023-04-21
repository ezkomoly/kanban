import express from 'express';
import { TaskService } from './tasks.service';


const taskService = new TaskService();

export const tasksRouter = express.Router();

tasksRouter.get('/', async (req, res) => {
    res.status(200).send(await taskService.getAllTasks());
});

tasksRouter.put('/', async (req, res) => {
    res.status(200).send(await taskService.updateMany(req.body));
});

tasksRouter.post('/', async (req, res) => {
    const task = req.body;
    res.status(200).send(await taskService.createTask(task));
});

tasksRouter.delete('/:id', async (req, res) => {
    const id: number = +(req.params.id);
    await taskService.deleteTask(id);
    res.status(200).send({ message: "Task deleted" });
});