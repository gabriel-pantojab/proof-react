import { Task } from "../model/models";

export function addTasks({ tasks }: { tasks: Task[] }) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
