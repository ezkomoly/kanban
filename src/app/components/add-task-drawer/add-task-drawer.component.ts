import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { TaskDrawerService } from 'src/app/services/task-drawer.service';

@Component({
  selector: 'app-add-task-drawer',
  templateUrl: './add-task-drawer.component.html',
  styleUrls: ['./add-task-drawer.component.scss']
})
export class AddTaskDrawerComponent implements OnInit {

    @ViewChild('drawer') public drawer: MatDrawer;

    constructor(private _taskDrawerService: TaskDrawerService) {

     }
  
    ngOnInit(): void {
      this._taskDrawerService.drawerToggleSubject.subscribe(() => {
        console.log(this.drawer)
        this.drawer.toggle();
      });
    }
  
}
