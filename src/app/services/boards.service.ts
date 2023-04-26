import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Board } from "../models/kanban.model";


@Injectable({
    providedIn: 'root'
})
export class BoardsService {

    constructor(private http: HttpClient) { }

    getAllBoards(): Observable<Board[]> {
        return this.http.get<Board[]>('http://localhost:4000/boards').pipe(
            shareReplay()
        );
    }

}