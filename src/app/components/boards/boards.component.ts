import { Component, OnInit } from '@angular/core';
import { Changes } from 'src/app/models/changes.model';
import { TasksService } from 'src/app/services/tasks.service';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit{
  saveButtonVisible: boolean = false;
  changes: Changes[] = [];

  constructor(private _taskService: TasksService) { }

  ngOnInit(): void {
  }

  addChange(change: Changes){
    this.changes.push(change);
    this.saveButtonVisible = true;
  }

  saveChanges(){
    // Send a request with the changes array.
    this._taskService.updateTaskRelation(this.changes).subscribe();
    this.changes = [];
    this.saveButtonVisible = false;
  }


}

