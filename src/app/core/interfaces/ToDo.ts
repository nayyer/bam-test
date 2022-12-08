export interface ToDo {
  id: number;
  task: string;
  complete: boolean;
}



export enum Status
{

  Completed   = "Completed",
  InProgress  = "InProgress",
  ToBeDone    = "ToBeDone",
}