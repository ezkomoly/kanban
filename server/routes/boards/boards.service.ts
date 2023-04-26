import { db } from '../../utils/db.connector';


export class BoardService {
    constructor(){}


    async getAllBoards(){
        const data = await db.boards.findMany({
            orderBy: {
                id: 'asc'
            },
        });
        return data;
    }

    async getBoardById(id: number){
        const data = await db.boards.findUnique({
            where: {
                id
            },
            include: {
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        });
        return data;
    }

}