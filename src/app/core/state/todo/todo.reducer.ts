import { Action, createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Task } from './todo.model';
import * as todoActions from './todo.actions';
import {Storage} from "@core/helpers/Storage";

export interface State {
  tasks?: Task[];
  currentTask?: Task;
  deleteTaskId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  tasks: [{id: 1,task:''}],
  currentTask: {},
  deleteTaskId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

export const todoReducer = createReducer(
  initialState,

  // GeTasks
  on(todoActions.getTasks, (state) => {
      
    console.log("00000-------------",state);
    return {...state, isLoading: true}
      
  }),
  on(todoActions.getTasksFailure, (state) => {
   console.log("rrrrrrrrrrr",state)   
   return {...state, isLoading: true}}),
  on(todoActions.getTasksSuccess, (state, result) => {
      console.log("__________>",state,result);
      return{...state,tasks: result.data, isLoading: false, isLoadingSuccess: true}
  }),

  // Create Task Reducers
  on(todoActions.createTask, (state, {task}) => ({...state, isLoading: true, currentTask: task})),
  on(todoActions.createTaskSuccess, (state, result) => {
    const tasks = undefined !== state.tasks ? JSON.parse(JSON.stringify(state.tasks)) : [];
    const currentTask = undefined !== state.currentTask ? JSON.parse(JSON.stringify(state.currentTask)) : {};
    currentTask.id = result.taskId;
    tasks.push(currentTask);
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Task Reducers
  on(todoActions.deleteTask, (state, {taskid}) => ({...state, isLoading: true, deleteTaskId: taskid})),
  on(todoActions.deleteTaskSuccess, (state, result) => {
    let tasks = undefined !== state.tasks ? JSON.parse(JSON.stringify(state.tasks)) : [];
    if (result.status) {
      tasks = tasks.filter((task: { id: any; }) => task.id !== state.deleteTaskId);
    }
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   // Edit Task Reducers
   on(todoActions.editTask, (state, {task}) => ({...state, isLoading: true, currentTask: task})),
   on(todoActions.editTaskSuccess, (state, result) => {
    let tasks = undefined !== state.tasks ? JSON.parse(JSON.stringify(state.tasks)) : [];
    const currentTask = undefined !== state.currentTask ? JSON.parse(JSON.stringify(state.currentTask)) : {};
    tasks = tasks.map((tsk: { id: any; }) => {
      if (tsk.id === currentTask.id) {
        tsk = currentTask;
      }
      return tsk;
    });
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return todoReducer(state, action);
}

export const todosSelector=createSelector(createFeatureSelector("todos"),(todos:any)=>todos)

export const getTasks = (state: State) => {
    if (state){
  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
}
return {
    tasks:[{id: 1,task:''}],
    isLoading:false
}

};