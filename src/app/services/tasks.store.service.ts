import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, shareReplay, tap } from "rxjs";
import { Board, Column, Task } from "../models/kanban.model";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

// This whole service is only needed to tell components which columns are available.
// Currently only used in new-task-dialog.component.ts
// This should be able mergable with the tasks.service.ts
// Doing that should be okay, but deleteTask and updateTask methods, shouldn't really write into the subject,
// because those states are managed by cdk drag, and the delete task method itself.
// I think it could be a better if I merge the two services anyways, that the subject manages the state of deleting.

export class TasksStore {

    private subject = new BehaviorSubject<Column[]>([]);

    columns$: Observable<Column[]> = this.subject.asObservable();
    columnNames$: Observable<{id: number, name: string}[]> = this.columns$.pipe(
        map(columns => columns.map(column => ({id: column.id, name: column.name}))),
    );

    constructor(private http: HttpClient) {
        this.getAllColumns();
    }


    deleteTask(task: Task): Observable<Task> {
        const columns = this.subject.getValue();
        const newColumns = columns.map(column => {
            return {
                ...column,
                tasks: column.tasks.filter(t => t.id !== task.id)
            }
        })
        this.subject.next(newColumns);
        return this.http.delete<Task>(`http://localhost:4000/tasks/${task.id}`).pipe(
            catchError(err => {throw err}),
            shareReplay()
        )
    }

    addTask(task: Partial<Task>){
        // Making the request here first, so that we can attach the correct id to the task.
        return this.http.post<Task>(`http://localhost:4000/tasks`, task).pipe(
            catchError(err => {throw err}),
            tap(task => {
                // Adding the task to the correct column in the subject.
                const columns = this.subject.getValue();
                // Finding the column with the id from the response.
                const columnIndex = columns.findIndex(column => column.id === task.columnId);
                // Adding the task to the column.
                columns[columnIndex].tasks.push(task);
                // Updating the subject.
                this.subject.next(columns);
            })
        )
    }

    updateTask(task: Task, newColumnId: number){
        // Update on the server
        return this.http.put<Task>(`http://localhost:4000/tasks/${task.id}`, { newColumnId } ).pipe(
            catchError(err => {throw err}),
        )
    }

    getAllColumns(){
        return this.http.get<Board>(`http://localhost:4000/boards/1`).pipe(
            map(board => board.columns),
            tap(board => this.subject.next(board)),
        ).subscribe()
    }

    loadAllColumns(){
        return this.columns$;
    }

    getAllCoulmnNames(){
        return this.columnNames$;
    }



}