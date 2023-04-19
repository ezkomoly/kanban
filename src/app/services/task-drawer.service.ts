import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskDrawerService {
  public drawerToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public drawerState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  getDrawerState(){
    return this.drawerState.asObservable();
  }

  setDrawerState(state: boolean){
    this.drawerState.next(state);
  }

  public toggle() {
    return this.drawerToggleSubject.next(null);
  }

}
