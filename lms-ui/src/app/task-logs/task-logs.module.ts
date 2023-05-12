import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskLogListComponent } from './task-logs-list/task-log-list.component';
import { TaskLogFormComponent } from './task-logs-form/task-log-form.component';



@NgModule({
  declarations: [
    TaskLogListComponent,
    TaskLogFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TaskLogsModule { }
