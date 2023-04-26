import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/kanban.model';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit{

  boards$: Observable<Board[]>

  constructor(private boardsService: BoardsService){}

  ngOnInit(): void {

    this.boards$ = this.boardsService.getAllBoards();

  }


}
