import { Task, StateTask } from "./model/models";

export function sortTasks({ tasks }: { tasks: Task[] }) {
  return tasks.sort((a, b) => {
    if (a.state === StateTask.COMPLETED && b.state === StateTask.PEDDING) {
      return 1;
    }
    if (a.state === StateTask.PEDDING && b.state === StateTask.COMPLETED) {
      return -1;
    }
    return 0;
  });
}
