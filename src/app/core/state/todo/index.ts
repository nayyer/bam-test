import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector
  } from '@ngrx/store';
  import * as fromTodo from '@core/state/todo/todo.reducer';
  
  export interface State {
    todo: fromTodo.State;
  }
  
  export const reducers: ActionReducerMap<State> = {
    todo: fromTodo.reducer,
  };
  

  
  // console.log all actions
  export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
      console.log('state', state);
      console.log('action', action);
  
      return reducer(state, action);
    };
  }
  
  

  
  // Todo reducers Begin
  
  export const geTodoState = createFeatureSelector<fromTodo.State>('todo');
  
  export const getTasks = createSelector(
    geTodoState,
    fromTodo.getTasks
  );