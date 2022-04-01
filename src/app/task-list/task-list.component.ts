import { Component, OnInit } from '@angular/core';
import { TaskType, TaskModel } from '../_models/task-model';
import { TaskServicesService } from '../_services/task-services.service';
import { CookieService } from 'ng2-cookies';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details/task-details.component';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: [
  ]
})
export class TaskListComponent implements OnInit {

  public taskTypeList: Array<TaskType> = [];
  public taskList: Array<TaskModel> = [];
  constructor(private taskService: TaskServicesService, private cookieService: CookieService, public dialog: MatDialog) {
    this.taskService.obstaskTypeList.subscribe(tasklist => {
      this.taskTypeList.push(tasklist);
    });
    this.taskService.currentResponse.subscribe(task => {
      if (task.length === 0) {
        const taskListFromCookies = this.cookieService.get('taskList');
        if (taskListFromCookies !== '') {
          this.taskList = JSON.parse(taskListFromCookies);
          this.taskList.forEach(task => {
            this.taskService.updateTaskList(task);
          })
        }
      } else {
        this.taskList = task;
      }
    });
  }

  ngOnInit(): void {
  }

  deleteTask(id: number) {
    this.taskService.removeFromTaskList(id);
  }

  showTaskDetails(task: TaskModel){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.data=task;
    const dialogRef = this.dialog.open(TaskDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
