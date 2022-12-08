import { Injectable } from '@angular/core';
import { ToDo } from '@core/interfaces/ToDo';
import { HttpClient } from '@angular/common/http';
import {from} from 'rxjs'
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient,private afs:AngularFirestore,private _authService:AuthService) { }

  rootURL = '/api';

  getTasks() {
  console.log("oooooooo",this._authService.userData.uid)  
      const  docRef = this.afs.collection("tasks").ref
       return from(docRef.where('createBy', '==', this._authService.userData.uid).get())   
  }

  addTask(task: any) {
    let id = Math.random();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `tasks/${id}`
    );

    const taskData:any = {
      task:task.task|| null,
      status:task.status || null,
      createBy:task.createdBy
    };
    return from(userRef.set(taskData, {
      merge: true,
    }));



    // return this.http.post(this.rootURL + '/task', {task});
  }

  editTask(task: any) {
    return this.http.put(this.rootURL + '/task', {task});
  }

  deleteTask(taskId: any) {
    console.log('deleting task:::', taskId);
    return this.http.delete(`${this.rootURL}/task/${taskId}`);
  }
}
