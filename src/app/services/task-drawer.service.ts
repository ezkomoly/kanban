import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskDrawerService {
  public drawerState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  getDrawerState(){
    return this.drawerState.asObservable();
  }


  setDrawerState(state: boolean){
    this.drawerState.next(state);
  }
}
