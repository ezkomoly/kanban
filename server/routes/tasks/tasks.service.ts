import { Prisma } from '@prisma/client';
import { db } from '../../utils/db.connector';



export class TaskService {
    constructor(){
        console.log('TaskService created');
    }

    async getAllTasks(){
        const tasks = await db.tasks.findMany({
            include: {
                column: {
                    include: {
                        board: true
                    }
                }
            }
        });
        return tasks
    }

    async updateTaskRelation(idTask: number, idColumn: number){
        const task = await db.tasks.update({
            where: {
                id: idTask
            },
            data: {
                columnId: idColumn
            }
        })
        return task
    }

    async createTask(task: Prisma.TasksCreateInput){
        try {
            const newTask = await db.tasks.create({
                data: task
            });
            return newTask;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTask(id: number){
        await db.tasks.delete({
            where: { id }
        });
    }

}
