export class Column {
    constructor(
        public name: string,
        public tasks: Task[],
        public id: number,
    ){}
}


export class Task {
    constructor(
        public title: string,
        public text: string,
        public id: number
    ){}
}