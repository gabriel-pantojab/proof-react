import "./App.css";
import Task from "./components/Task";
import { Task as TaskModel, StateTask } from "./model/models";

const tasks: TaskModel[] = [
  {
    id: 1,
    name: "Tarea 1",
    state: StateTask.PEDDING,
  },
  {
    id: 2,
    name: "Tarea 2",
    state: StateTask.COMPLETED,
  },
  {
    id: 3,
    name: "Tarea 3",
    state: StateTask.PEDDING,
  },
];

function App() {
  return (
    <>
      <header>
        <h1>Lista de Tareas</h1>
      </header>
      <main>
        <section className="container-todo-list">
          <ul>
            {tasks.map((task) => (
              <Task key={task.id} {...task} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
