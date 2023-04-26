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
                data: {
                    title: task.title,
                    text: task.text,
                    columnId: +task.column
                }
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

    async updateMany(data: any){
        const responseData = db.$transaction(async(db) => {
            for(let i of data){
                await db.tasks.update({
                    where: { id: i.idTask },
                    data: { columnId: i.idColumn }
                })
            }
        });
        return responseData
    }

}
