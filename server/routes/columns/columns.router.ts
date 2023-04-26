import express from 'express';
import { ColumnService } from './columns.service';

const columnService = new ColumnService();
export const columnsRouter = express.Router();


columnsRouter.get('/', async (req, res) => {
    console.log("A request was made to /columns")
    res.status(200).json(await columnService.getAllColumns());
});

columnsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    res.status(200).json(await columnService.updateColumnName(Number(id), name.toUpperCase()));
});