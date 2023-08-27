import { useState } from "react";
import "./App.css";
import Task from "./components/task/Task";
import { Task as TaskModel } from "./model/models";

function App() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  return (
    <>
      <header>
        <h1>Lista de Tareas</h1>
      </header>
      <main>
        <section className="container-todo-list">
          <ul className="task-list">
            {tasks.length > 0 ? (
              tasks.map((task) => <Task key={task.id} {...task} />)
            ) : (
              <li className="task-empty">No hay tareas</li>
            )}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
