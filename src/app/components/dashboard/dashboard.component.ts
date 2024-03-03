import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  // Create variables for hold value
  taskObj:Todo = new Todo();
  taskArr:Todo[]= [];

  addTaskData:string ='';
  editTaskData:any='';


  constructor(private api:TaskService){}

  ngOnInit():void{
    this.editTaskData=''
    this.addTaskData=''
  this.taskObj = new Todo();
  this.taskArr=[];
  this.getAllTask();
  }
  addTask(){
    this.taskObj.task = this.addTaskData;
    this.api.addTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
      this.addTaskData=''
    },err=>{
      alert(err);
    })
  }
  getAllTask(){
    this.api.getAllTask().subscribe(res=>{
      this.taskArr=res;
    },err=>{
      alert('Unable to find task')
    })
  }
  editTask(){
    this.taskObj.task= this.editTaskData;
    this.api.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert('Unable to Update Task')
    })
  }
  deleteTask(task:Todo){
    this.api.deleteTask(task).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert('failed to Delete Task')
    })
  }
  callEdit(task:Todo){
    this.taskObj= task;
    this.editTaskData= task.task;
  }
}
