import express from 'express';
import { BoardService } from './boards.service';

const boardsService = new BoardService();
export const boardsRouter = express.Router();


boardsRouter.get('/', async (req, res) => {
    res.status(200).json(await boardsService.getAllBoards());
});


boardsRouter.get('/:id', async (req, res) => {
    res.status(200).json(await boardsService.getBoardById(+req.params.id));
});