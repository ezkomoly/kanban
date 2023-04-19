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

  drawerOpened = false;

  constructor(private _taskDrawerService: TaskDrawerService) {

   }

  ngOnInit(): void {
    this._taskDrawerService.getDrawerState().subscribe((state) => {
      this.drawerOpened = state;
    })
  }

  drawerClosed(){
    this._taskDrawerService.setDrawerState(false);
  }


  toggleDrawer(){
    this.drawerOpened = !this.drawerOpened;
    this._taskDrawerService.setDrawerState(this.drawerOpened);
  }

}
