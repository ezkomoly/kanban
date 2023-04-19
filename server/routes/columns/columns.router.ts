import express from 'express';
import { ColumnService } from './columns.service';

const columnService = new ColumnService();
export const columnsRouter = express.Router();


columnsRouter.get('/', async (req, res) => {
    res.status(200).json(await columnService.getAllColumns());
});