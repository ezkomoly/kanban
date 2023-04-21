import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Changes } from 'src/app/models/changes.model';
import { Column, Task } from 'src/app/models/column.model';
import { ColumnsService } from 'src/app/services/columns.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Output() changes: EventEmitter<Changes> = new EventEmitter<Changes>();

  columnObject: Column[] = [];
  editingColumn: Column | null = null;
  prevColumnName: string = '';

  constructor(private _columnsService: ColumnsService, private _taskService: TasksService) { }

  ngOnInit(): void {
    this.getColumns()
  }

  isInLastColumn(task: Task) {
    return this.columnObject[this.columnObject.length - 1].tasks.includes(task)
  } 

  getColumns() {
    this._columnsService.getColumns().subscribe()
    this._columnsService.columnsBehaviorSubject.subscribe((columns: Column[]) => {
      this.columnObject = columns;
    });
  }

  drop(event: CdkDragDrop<Task[]>, id: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.container.data)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.changes.emit({ idColumn: id, idTask: event.container.data[event.currentIndex].id })
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
  
}
