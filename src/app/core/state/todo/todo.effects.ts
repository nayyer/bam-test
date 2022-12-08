import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { ToDoService } from '../../../../app/features/dashboard/to-do/to-do.service';
import * as todoActions from './todo.actions';

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoService: ToDoService
  ) {}

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.getTasks),
      switchMap(action =>
        this.todoService.getTasks().pipe(
          map((response:any) => {
            
            let data: any[] =[];
            response.forEach((doc:any)=>data.push(doc.data()))
            
            //response=response.data();
            console.log("dataaaaa",data)
            return todoActions.getTasksSuccess({data})
          }),
          catchError((error: any) => of(todoActions.getTasksFailure(error))))
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.createTask),
      exhaustMap(action =>
        this.todoService.addTask(action.task).pipe(
          map(response => todoActions.createTaskSuccess(response)),
          catchError((error: any) => {console.log(error);return of(todoActions.createTaskFailure(error))}))
      )
    )
  );


  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteTask),
      exhaustMap(action => this.todoService.deleteTask(action.taskid).pipe(
          map(response => todoActions.deleteTaskSuccess(response)),
          catchError((error: any) => of(todoActions.deleteTaskFailure(error))))
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.editTask),
      exhaustMap(action =>
        this.todoService.editTask(action.task).pipe(
          map(response => todoActions.editTaskSuccess(response)),
          catchError((error: any) => of(todoActions.editTaskFailure(error))))
      )
    )
  );

}