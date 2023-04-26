import { Component } from '@angular/core';
import { speedDialFabAnimations } from './fab.animations'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { fabButton } from 'src/app/models/fab.model';


@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  animations: [speedDialFabAnimations]
})


export class FabComponent {
  fabButtons: fabButton[] = [
  
  ];
  fabTogglerState = 'inactive';


  constructor(private dialog: MatDialog){}

  showItems(){
    this.fabTogglerState = 'active';
    this.fabButtons = [
      { key: 1, icon: 'add', tooltip: 'Add new Task' },
      { key: 2, icon: 'code', tooltip: 'GitHub Repository' }
    ];
  }

  hideItems(){
    this.fabTogglerState = 'inactive';
    this.fabButtons = [];
  }

  onToggleFab(){
    this.fabTogglerState === 'inactive' ? this.showItems() : this.hideItems();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.direction = 'ltr';
    this.dialog.open(NewTaskDialogComponent, dialogConfig);
  }

  onFabClick(btn: any){
    switch(btn.key){
      case 1:
        console.log('Add new Task');
        this.openDialog();
        break;
      case 2:
        window.open('https://github.com/ezkomoly/kanban', '_blank');
        console.log('GitHub Repo');
        break;
    }
  }

}
