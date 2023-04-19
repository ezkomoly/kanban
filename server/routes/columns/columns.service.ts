import { db } from '../../utils/db.connector';


export class ColumnService {
    constructor(){
        console.log('ColumnService created');
    }

    async getAllColumns(){
        const data = await db.columns.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                tasks: true
            }
        });
        return data;
    }

    async updateColumnName(id: number, name: string){
        try {
            const data = await db.columns.update({
                where: {id},
                data: {
                    name
                }
            });
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }

    }




}