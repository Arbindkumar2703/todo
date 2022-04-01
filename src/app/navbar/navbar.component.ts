import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CookieService } from 'ng2-cookies';
import { TaskServicesService } from '../_services/task-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog, private cookieService: CookieService, private taskService: TaskServicesService) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(AddTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  clearSession() {
    this.cookieService.deleteAll();
    window.location.reload();
  }
  SaveAsSession() {
    this.taskService.getTaskList().subscribe(taskList => {
      this.cookieService.set('taskList',JSON.stringify(taskList) , 1);
    })

  }

}
