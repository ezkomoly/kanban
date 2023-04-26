import express from 'express';
import { TaskService } from './tasks.service';


const taskService = new TaskService();

export const tasksRouter = express.Router();

tasksRouter.get('/', async (req, res) => {
    res.status(200).send(await taskService.getAllTasks());
});

tasksRouter.put('/:id', async (req, res) => {
    res.status(200).send(await taskService.updateTaskRelation(+req.params.id, req.body.newColumnId));
});

tasksRouter.post('/', async (req, res) => {
    const task = req.body;
    console.log(task)
    res.status(200).send(await taskService.createTask(task));
});

tasksRouter.delete('/:id', async (req, res) => {
    const id: number = +(req.params.id);
    await taskService.deleteTask(id);
    res.status(200).send({ message: "Task deleted" });
});