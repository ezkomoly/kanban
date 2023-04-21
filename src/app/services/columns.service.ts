import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Column } from '../models/column.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {
  columns: Column[] = [];
  columnsBehaviorSubject: BehaviorSubject<Column[]> = new BehaviorSubject(this.columns);


  constructor(private _httpClient: HttpClient) { }

  getColumns(): Observable<Column[]> {
    return this._httpClient.get<Column[]>('http://localhost:4000/columns').pipe(
      tap((columns: Column[]) => this.columnsBehaviorSubject.next(columns))
    );
  }

  updateColumnName(id: number, name: string): Observable<Column> {
    return this._httpClient.put<Column>(`http://localhost:4000/columns/${id}`, { name });
  }

  createColumn(name: string): Observable<Column> {
    return this._httpClient.post<Column>('http://localhost:4000/columns', { name });
  }

}
