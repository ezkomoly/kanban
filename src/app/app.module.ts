import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { BoardComponent } from './components/board/board.component';
import { LoadingService } from './components/loading/loading.service';
import { FabComponent } from './components/fab/fab.component';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    MainViewComponent,
    BoardComponent,
    FabComponent,
    NewTaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule { }
