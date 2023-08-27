export interface Task {
  id: number;
  name: string;
  state: StateTask;
}

export enum StateTask {
  PEDDING = "PEDDING",
  COMPLETED = "COMPLETED",
}
