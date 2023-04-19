import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: any[] = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _httpClient: HttpClient) { }


  updateTaskRelation(idColumn: number, idTask: number): Observable<any> {
    console.log(idColumn, idTask)
    return this._httpClient.put(`http://localhost:4000/tasks/${idTask}`, { idColumn }, this.httpOptions).pipe();
  }

}
 