import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksService } from 'src/app/services/tasks.service';
import { Column, Task } from 'src/app/models/column.model';
import { ColumnsService } from 'src/app/services/columns.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent {
  title: string = ''
  text: string | undefined = ''

  columns: Column[] = [];
  newTaskForm: FormGroup
  newTaskId: number



  constructor(
    private _tasksService: TasksService,
    private _columnsService: ColumnsService,
    private dialogRef: MatDialogRef<NewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Column[]
    ){
    this.columns = data;
    this.newTaskForm = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      text: new FormControl(this.text),
      columnObject: new FormControl('', [Validators.required]),
    });
  }

  onClose(){
    this.dialogRef.close();
  }


  onCreate(){
    if(this.newTaskForm.invalid) return;
    this._tasksService.createTask(this.newTaskForm.value.title!, this.newTaskForm.value.columnObject.id, this.newTaskForm.value.text!).pipe(
      tap((task: Task) => {
        this.columns[this.columns.indexOf(this.newTaskForm.value.columnObject)].tasks.push({
          id: task.id,
          title: task.title,
          text: task.text,
          columnId: task.columnId
        })
        this._columnsService.columnsBehaviorSubject.next(this.columns);
      })
    ).subscribe();
    // Need to update the column behaviour subject, with the new task.
    this.dialogRef.close();
  }

  get taskTitle(){
    return this.newTaskForm.get('title');
  }
  get taskText(){
    return this.newTaskForm.get('text');
  }
  get taskColumn(){
    return this.newTaskForm.get('columnObject');
  }

}
