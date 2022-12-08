import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Status } from '@core/interfaces/ToDo';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {


  constructor() { }
  term: string = '';
  @Input()
  tasks: any[]=[];
  @Output() deleteTask = new EventEmitter<any>();
  @Output() editTask = new EventEmitter<any>();

  editingId: any;

  editForm = new FormGroup({
    id: new FormControl('',  Validators.required),
    task: new FormControl('',  Validators.required),
    assignee: new FormControl('',  Validators.required),
    status: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.editTask.emit(this.editForm.value);
  }

  delTask(task:any) {
    this.deleteTask.emit(task);
  }

  drop(event: CdkDragDrop<string[]>){

  }
    /**
   * @returns css class for order status
   * */
  getStatusClass(status: Status)
  {
    return {
      'success-color': status == Status.Completed,
      'warning-color'  : status == Status.InProgress,
      'info-color': status == Status.ToBeDone,

    }
  }

   /**
   * @returns {string} the transaction type title
   * @param {TransactionType} type
   * */
  getStatus(type: Status): string
  {
    switch (type)
    {
      case Status.Completed:
        return 'COMPLETED';
      case Status.InProgress:
        return 'INPROGRESS';
      case Status.ToBeDone:
        return 'TOBEDONE';
    }
  }      

}