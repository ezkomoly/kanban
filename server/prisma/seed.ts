import { db } from '../utils/db.connector';


async function main(){
    const board1 = await db.boards.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Board 1',
            columns:{
                create: [
                    {
                        id: 1,
                        name: 'Backlog',
                        tasks: {
                            create: [
                                {
                                    id: 1,
                                    title: 'Impelemnt customer requests',
                                    text: 'Requests that customers can make'
                                },
                                {
                                    id: 2,
                                    title: 'Impelement Google APIs',
                                    text: 'Google Maps, Google Calendar, Google Drive'
                                }
                            ]
                        }
                    },
                    {
                        id: 2,
                        name: 'In progress',
                        tasks: {
                            create: [
                                {
                                    id: 3,
                                    title: 'Create a customers table',
                                    text: 'Add required fields, and relations'
                                },
                                {
                                    id: 4,
                                    title: 'Complete backend documentation',
                                }
                            ]
                        }
                    },
                    {
                        id: 3,
                        name: 'Done',
                        tasks: {
                            create: [
                                {
                                    id: 5,
                                    title: 'Implement drag and drop cards',
                                },
                                {
                                    id: 6,
                                    title: 'Make a cards component',
                                    text: 'Make a component that will be used to display cards. This component will be used in the boards component.'
                                },
                                {
                                    id: 7,
                                    title: 'Implement Main function button',
                                    text: 'This button will be used to add new tasks, new columns to current view, and write them to database'
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });
}

main().then(async () => {
    await db.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
})