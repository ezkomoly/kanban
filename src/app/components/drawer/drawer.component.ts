import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { TaskDrawerService } from 'src/app/services/task-drawer.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
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
