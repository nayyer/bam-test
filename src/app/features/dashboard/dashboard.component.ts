import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {AppService} from "@core/root/app.service";

import {UserInfo} from "@core/interfaces/User";

import {Theme} from '@core/interfaces/Theme';
import {TokenStorageService} from '@core/services/interceptors/token-storage.service';

import {Language} from "@core/interfaces/Language";
import {environment} from "@environment/environment";
import { takeUntil } from 'rxjs';
import { BaseComponent } from '@core/root/base.component';
import { AuthService } from 'src/app/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromRoot from '@core/state/todo/';
import * as todoActions from '@core/state/todo/todo.actions';
import { Store } from '@ngrx/store';
import { todosSelector } from '@core/state/todo/todo.reducer';
import { Status } from '@core/interfaces/ToDo';


@Component(
  {
    selector   : 'app-dashboard',
    templateUrl: 'dashboard.html',
    styleUrls  : ['dashboard.scss'],
  }
)
export class DashboardComponent extends BaseComponent
{

  

 
  isChecking: boolean = false;

  

  get userInfo(): any
  {
    return this._authService.userData;
  }

  


  get theme(): Theme
  {
    return this._appService.getTheme() || 'light';
  }

  get lang(): Language
  {
    return this._appService.lang || environment.defaultLang;
  }

  user: any;
  tasks: any[] = [];

  todoForm = new FormGroup({
    task: new FormControl('',  Validators.required),
    assignee: new FormControl(''),
    status: new FormControl('',  Validators.required)
  });
  status: { title: string, value: string }[] = [
    {
      title:'To Be Done',
      value:Status.ToBeDone
    },
    {
      title:'In Progress',
      value:Status.InProgress
    },
    {
      title:'Completed',
      value:Status.Completed
    }
    
  ]
  constructor(private router: Router, private readonly store: Store,private _appService:AppService, private _authService:AuthService) {
    super()
    this.store.select(todosSelector).pipe(
      takeUntil(this.stop$)
    ).subscribe((data: any) => {
      console.log('data',data)
      this.tasks =data.tasks
    });
  }

ngOnInit(){
  this._authService.getUserInfoFetch().pipe(takeUntil(this.stop$)).subscribe((userinfo:UserInfo={})=> {
    if (this.userInfo){ 
      console.log("this.userInfo",this.userInfo)
      this.store.dispatch(todoActions.getTasks());
    }
  })
  }



  onSubmit() {
    console.log(this.todoForm.value);
    const task = {
      createdBy: this.userInfo.uid,
      task: this.todoForm.value.task,
      status: this.todoForm.value.status
    };
    this.store.dispatch(todoActions.createTask({task}));
    this.todoForm.reset();
  }

  deleteTask(taskid: any) {
    console.log('deleting this task:::', taskid);
    this.store.dispatch(todoActions.deleteTask({taskid}));
  }

  editTask(task: any) {
    console.log('editing this task:::', task);
    this.store.dispatch(todoActions.editTask({task}));
  }


}
