import "./task.css";

interface TaskProps {
  id: number;
  name: string;
  state: StateTask;
  doneTask: (id: number) => void;
  undoTaks: (id: number) => void;
  deleteTask: (id: number) => void;
}

enum StateTask {
  PEDDING = "PEDDING",
  COMPLETED = "COMPLETED",
}

export default function Task({
  id,
  name,
  state,
  doneTask,
  undoTaks,
  deleteTask,
}: TaskProps) {
  return (
    <li
      className={`
      task
      ${state === StateTask.COMPLETED ? "completed" : ""}
    `}
    >
      <h3 className="task-title">{name}</h3>
      <div className="actions-task">
        <button
          className="btn-done"
          onClick={() => {
            if (state === StateTask.PEDDING) {
              doneTask(id);
            } else {
              undoTaks(id);
            }
          }}
        >
          {state === StateTask.PEDDING ? "Completar" : "Deshacer"}
        </button>
        <button
          className="btn-delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
