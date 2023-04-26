import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Column } from 'src/app/models/kanban.model';
import { TasksStore } from 'src/app/services/tasks.store.service';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent implements OnInit{

  columnNames$: Observable<any>
  newTaskForm: FormGroup;



  constructor(private tasksStore: TasksStore, private dialogRef: MatDialogRef<NewTaskDialogComponent>) {
    this.newTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      text: new FormControl(),
      column: new FormControl("", [Validators.required]),
    });
  }

  get f () { return this.newTaskForm.controls }

  ngOnInit() {
    this.columnNames$ = this.tasksStore.getAllCoulmnNames();
  }

  onSubmit() {
    if(!this.newTaskForm.valid) return;
    this.tasksStore.addTask(this.newTaskForm.value).subscribe();
    this.dialogRef.close();


  }

  onClose() {
    this.dialogRef.close();
  }


}
