import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { tasksRouter } from './routes/tasks/tasks.router';
import { columnsRouter } from './routes/columns/columns.router';
import { boardsRouter } from './routes/boards/boards.router';
dotenv.config();



const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());

const router = express.Router();
app.use(router)

router.use('/tasks', tasksRouter);
router.use('/columns', columnsRouter);
router.use('/boards', boardsRouter);


app.listen(process.env.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});