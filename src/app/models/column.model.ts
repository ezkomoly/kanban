export class Column {
    constructor(
        public id: number,
        public name: string,
        public tasks: Task[]
    ){}
}


export class Task {
    constructor(
        public title: string,
        public text: string,
        public id: number
    ){}
}