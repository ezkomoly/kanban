import express from 'express';
import { TaskService } from './tasks.service';

const taskService = new TaskService();

export const tasksRouter = express.Router();

tasksRouter.get('/', async (req, res) => {
    res.status(200).send(await taskService.getAllTasks());
});

tasksRouter.put('/:id', async (req, res) => {
    console.log('request is here')
    const idTask: number = +(req.params.id);
    const idColumn: number = +(req.body.idColumn);
    res.status(200).send(await taskService.updateTaskRelation(idTask, idColumn));
});