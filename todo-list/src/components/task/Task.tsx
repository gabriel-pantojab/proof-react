import "./task.css";

interface TaskProps {
  id: number;
  name: string;
  state: StateTask;
}

enum StateTask {
  PEDDING = "PEDDING",
  COMPLETED = "COMPLETED",
}

export default function Task({ id, name, state }: TaskProps) {
  return (
    <li
      className={`
      task
      ${state === StateTask.COMPLETED ? "completed" : ""}
    `}
    >
      <h3 className="task-title">{name}</h3>
      <div className="actions-task">
        <button className="btn-done">
          {state === StateTask.PEDDING ? "Completar" : "Deshacer"}
        </button>
        <button className="btn-delete">Eliminar</button>
      </div>
    </li>
  );
}
