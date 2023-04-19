import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnsService } from 'src/app/services/columns.service';
import { Column, Task } from 'src/app/models/column.model';
import { TasksService } from 'src/app/services/tasks.service';
import { Changes } from 'src/app/models/changes.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit{
  object: Column[] = [];
  changes: Changes[] = [];
  saveButtonVisible: boolean = false;
  editingColumn: Column | null = null;


  constructor(private _columnsService: ColumnsService, private _taskService: TasksService) { }

  ngOnInit(): void {
    this.getColumns();
  }

  getColumns() {
    this._columnsService.getColumns().subscribe(res => {
      this.object = res
    })

  }


  drop(event: CdkDragDrop<Task[]>, id: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // Creates an array of object of all changes that were made.
      // Only changing a column counts as a change, hence why this is in the else statement.
      this.changes.push({ idColumn: id, idTask: event.container.data[event.currentIndex].id }) 
      this.updateTask(id, event.container.data[event.currentIndex].id);

    }

  }

  columnNameChange(column: Column) {
    this.editingColumn = column;
  }


  onColumnNameBlur(){
    this._columnsService.updateColumnName(this.editingColumn!.id, this.editingColumn!.name).subscribe();
    this.editingColumn = null;
  }
  
  updateTask(idColumn: number, idTask: number): void {
    //this._taskService.updateTaskRelation(idColumn, idTask).subscribe();
    console.log(this.changes)
  }

}
