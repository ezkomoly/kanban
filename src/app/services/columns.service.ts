import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Column } from '../models/column.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  colums: Column[] = [];


  constructor(private _httpClient: HttpClient) { }

  getColumns(): Observable<Column[]> {
    return this._httpClient.get<Column[]>('http://localhost:4000/columns');
  }

  updateColumnName(id: number, name: string): Observable<Column> {
    return this._httpClient.put<Column>(`http://localhost:4000/columns/${id}`, { name });
  }

}
