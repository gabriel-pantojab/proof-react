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
    <li>
      <article>
        <h3>{name}</h3>
        <div className="actions-task">
          <button>Completas</button>
          <button>Eliminar</button>
        </div>
      </article>
    </li>
  );
}
