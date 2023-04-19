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


}
