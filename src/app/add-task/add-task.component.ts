import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskModel } from '../_models/task-model';
import { TaskServicesService } from '../_services/task-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styles: [
  ]
})
/* id:number,
    title:string,
    description: string,
    tasktype:number,
    taskTypeName:string,*/
export class AddTaskComponent implements OnInit {
  public myForm!: FormGroup;
  private taskTypes = this.taskService.taskType;
  public taskList: Array<TaskModel> = [];
  constructor(private fb: FormBuilder,
    private taskService: TaskServicesService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private _snackBar: MatSnackBar) {
    this.myForm = this.fb.group({
      id: 0,
      title: ["", Validators.required],
      description: ["", Validators.required],
      tasktype: [Number, Validators.required],
      taskTypeName: [""],
    });
  }

  ngOnInit(): void {

  }
  onSubmitClick(): void {
    if (this.myForm.valid) {
      var selectedTaskType = this.taskTypes.filter(x => x.typeId === this.myForm.value.tasktype)[0].typeName;
      this.myForm.controls["taskTypeName"].setValue(selectedTaskType);
      this.taskService.currentResponse.subscribe(task => {
        this.taskList = task;
      })
      var index = this.taskList.length + 1;
      const hasTitle = this.taskList.filter(task => task.title === this.myForm.value.title);
      if (hasTitle.length > 0 && hasTitle) {
        this._snackBar.open(this.myForm.value.title + 'Already Exist !','',{
          duration: 5 * 1000,
        });
        return;
      }
      this.myForm.controls["id"].setValue(index);
      this.taskService.updateTaskList(this.myForm.value)
      this.dialogRef.close();
    } else {
    }

  }
  close() {
    this.dialogRef.close();
  }

}
