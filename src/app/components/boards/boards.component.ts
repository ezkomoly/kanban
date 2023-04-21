import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragRelease, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  columnObject: Column[] = [];
  changes: Changes[] = [];
  saveButtonVisible: boolean = false;
  editingColumn: Column | null = null;
  prevColumnName: string = '';
  trashStatus: boolean = false;

  constructor(private _columnsService: ColumnsService, private _taskService: TasksService) { }

  ngOnInit(): void {
    this.getColumns();
  }

  getColumns() {
    this._columnsService.getColumns()
    this._columnsService.columnsBehaviorSubject.subscribe((columns: Column[]) => {
      this.columnObject = columns;
    });
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


  taskDelete(id: number) {
    this.columnObject.forEach((column: Column) => {
      column.tasks = column.tasks.filter((task: Task) => task.id !== id);
    });
    this._taskService.deleteTask(id).subscribe();
    this._columnsService.columnsBehaviorSubject.next(this.columnObject);
  }

  columnNameChange(column: Column) {
    this.prevColumnName = column.name;
    this.editingColumn = column;
  }


  onColumnNameBlur(){
    if(this.editingColumn!.name !== this.prevColumnName) {
      this._columnsService.updateColumnName(this.editingColumn!.id, this.editingColumn!.name).subscribe();
    }
    const index = this.columnObject.findIndex((obj => obj.id === this.editingColumn!.id));
    this.columnObject[index].name = this.editingColumn!.name;
    this.editingColumn = null;
    this._columnsService.columnsBehaviorSubject.next(this.columnObject);
  }
  
  updateTask(idColumn: number, idTask: number): void {
    //this._taskService.updateTaskRelation(idColumn, idTask).subscribe();
  }

}

