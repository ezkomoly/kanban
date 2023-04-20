import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FabModel } from 'src/app/models/fab.model';
import { speedDialFabAnimations } from './fab.animations'
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';


@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  animations: speedDialFabAnimations
})
export class FabComponent implements OnInit{

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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };
    this.dialog.open(NewTaskDialogComponent, dialogConfig);
  }

  onFabClick(btn: FabModel){
    switch(btn.key){
      case 1:
        console.log('Add new Task');
        this.openDialog();
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
