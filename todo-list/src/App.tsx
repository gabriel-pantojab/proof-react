import { useState } from "react";
import "./App.css";
import Task from "./components/task/Task";
import { StateTask, Task as TaskModel } from "./model/models";
import Swal from "sweetalert2";

function App() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const addTask = ({ name }: { name: string }) => {
    const id = Date.now();
    const newTask: TaskModel = {
      id,
      name,
      state: StateTask.PEDDING,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleAddTask = () => {
    Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage("El nombre es requerido");
        }
        addTask({ name });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const doneTask = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.state = StateTask.COMPLETED;
      setTasks([...tasks]);
    }
  };

  const undoTask = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.state = StateTask.PEDDING;
      setTasks([...tasks]);
    }
  };

  return (
    <>
      <header>
        <h1>Lista de Tareas</h1>
      </header>
      <main>
        <section className="container-todo-list">
          <div className="actions">
            <button className="btn-add" onClick={handleAddTask}>
              Nueva Tarea
            </button>
          </div>

          <ul className="task-list">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  {...task}
                  doneTask={doneTask}
                  undoTaks={undoTask}
                />
              ))
            ) : (
              <li className="task-empty">
                <h3>No hay tareas</h3>
              </li>
            )}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
