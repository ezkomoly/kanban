import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardBarComponent } from './components/board-bar/board-bar.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ColumnFormComponent } from './components/column-form/column-form.component';
import { FabComponent } from './components/fab/fab.component';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    NavbarComponent,
    BoardsComponent,
    BoardBarComponent,
    TaskFormComponent,
    ColumnFormComponent,
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
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
