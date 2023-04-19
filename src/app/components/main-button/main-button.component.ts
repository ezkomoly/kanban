import { Component, OnInit, ViewChild } from '@angular/core';
import { FabModel } from 'src/app/models/fab.model';
import { speedDialFabAnimations } from './main-button.animations'
import { TaskDrawerService } from 'src/app/services/task-drawer.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
  animations: speedDialFabAnimations
})
export class MainButtonComponent implements OnInit{

  @ViewChild('drawer') drawer: MatDrawer

  fabButtons: FabModel[] = [
    { icon: 'add_circle_outline', tooltip: 'Add new Task', key: 1 },
    { icon: 'view_headline', tooltip: 'Add new Column', key: 2 },
    { icon: 'dashboard', tooltip: 'Add new Board', key: 3 },
    { icon: 'code', tooltip: 'GitHub Repository', key: 4 }
  ];
  buttons: FabModel[] = [];
  fabTogglerState = 'inactive';
  drawerState = false;

  constructor(private _taskDrawerService: TaskDrawerService) { }

  ngOnInit(): void {
    this._taskDrawerService.getDrawerState().subscribe((state) => {
      this.drawerState = state;
    })
  }

  showItems(){
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }


  hideItems(){
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab(){
    this.fabTogglerState === 'inactive' ? this.showItems() : this.hideItems();
  }


  onFabClick(btn: FabModel){
    switch(btn.key){
      case 1:
        console.log('Add new Task');
        this._taskDrawerService.setDrawerState(!this.drawerState);
        break;
      case 2:
        console.log('Add new Column');
        break;
      case 3:
        console.log('Add new Board');
        break;
      case 4:
        console.log('GitHub Repository');
        window.open('https://github.com/ezkomoly/kanban', '_blank');
        break;
      default:
        console.log('No action defined');
    }
  }

}
