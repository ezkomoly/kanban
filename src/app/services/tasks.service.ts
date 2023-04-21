import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColumnsService } from './columns.service';
import { Task } from '../models/column.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: any[] = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _httpClient: HttpClient, private _columnService: ColumnsService) { }


  updateTaskRelation(idColumn: number, idTask: number): Observable<any> {
    return this._httpClient.put(`http://localhost:4000/tasks/${idTask}`, { idColumn }, this.httpOptions).pipe();
  }

  createTask(title: string, text: string, columnId: number): Observable<any>{
    return this._httpClient.post(`http://localhost:4000/tasks`, {title, text, columnId}, this.httpOptions).pipe();
  }

  deleteTask(id: number): Observable<any>{
    return this._httpClient.delete(`http://localhost:4000/tasks/${id}`).pipe();
  }

}
 