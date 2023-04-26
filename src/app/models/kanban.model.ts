export interface Board {
    id: number;
    name: string;
    columns: Column[];
}

export interface Column {
    id: number;
    name: string;
    tasks: Task[];
}

export interface Task {
    id: number;
    title: string;
    text: string;
    columnId: number;
}

