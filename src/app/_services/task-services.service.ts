import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { TaskModel, TaskType } from '../_models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskServicesService {

  private taskList : Array<TaskModel> = [];

  public taskType : Array<TaskType> = [];
  public obstaskTypeList !: Observable<any>;

  private messageResponse = new BehaviorSubject(this.taskList);
  currentResponse = this.messageResponse.asObservable();

  constructor() {
    this.initializer();
    this.obstaskTypeList = from(this.taskType);
  }

  getTaskList() {
    return this.currentResponse;
  }

  updateTaskList(task: TaskModel) {
    this.taskList.push(task)
    this.messageResponse.next(this.taskList);
  }

  removeFromTaskList(id:number) {
   const taskToKeep = this.taskList.filter(task => task.id !== id);
   this.taskList = taskToKeep;
   this.messageResponse.next(this.taskList);
  }
  /* In absence of database we are initiate the data over here */
  initializer() {
    this.taskType.push({
      typeId: 1,
      typeName: 'Low',
    }, {
      typeId: 2,
      typeName: 'Medium',
    }, {
      typeId: 3,
      typeName: 'High',
    })
  }
}
