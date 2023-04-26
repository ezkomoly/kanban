import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, filter, map, tap } from 'rxjs';
import { Column, Task } from 'src/app/models/kanban.model';
import { LoadingService } from '../loading/loading.service';
import { TasksStore } from 'src/app/services/tasks.store.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  
  columns$: Observable<Column[]>
  
  constructor(
    private route: ActivatedRoute, 
    private tasksStore: TasksStore
    ) {}

  ngOnInit(): void {

    // This is where we load the columns and tasks into the view from the server. 
    // An updated version of this, would be passing the route parameter to the service, and getting the specific board from the server.
    // For not this only works with board id 1.
    this.columns$ = this.tasksStore.loadAllColumns(); 

  }

  // This event kind of manages the state of the columns on its own, so a store is not needed
  drop(event: CdkDragDrop<Task[]>, id: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.container.data)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.tasksStore.updateTask(event.container.data[event.currentIndex], id).subscribe();
    }
  }

  deleteTask(task: Task) {
    // This method does make use of the task.store.service.ts.
    // It is an optimistic request again, as we don't wait for the response from the server to update the UI.
    
    this.tasksStore.deleteTask(task).subscribe();
  }


}
