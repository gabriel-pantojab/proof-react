import { useState } from "react";
import "./App.css";
import Task from "./components/task/Task";
import { StateTask, Task as TaskModel } from "./model/models";
import Swal from "sweetalert2";
import { sortTasks } from "./utils";
import { addTasks } from "./storage/localStorage";

function handleAddTask({
  addTask,
}: {
  addTask: ({ name }: { name: string }) => void;
}) {
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
}

function handleDeleteTask({
  deleteTask,
  id,
}: {
  deleteTask: (id: number) => void;
  id: number;
}) {
  Swal.fire({
    title: "Eliminar tarea",
    text: "¿Está seguro de eliminar la tarea?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTask(id);
      Swal.fire("Eliminado", "La tarea ha sido eliminada", "success");
    }
  });
}

function App() {
  const [tasks, setTasks] = useState<TaskModel[]>(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return JSON.parse(tasks);
    }
    return [];
  });

  const addTask = ({ name }: { name: string }) => {
    const id = Date.now();
    const newTask: TaskModel = {
      id,
      name,
      state: StateTask.PEDDING,
    };
    const temp = [newTask, ...tasks];
    addTasks({ tasks: temp });
    setTasks(temp);
  };

  const doneTask = (id: number) => {
    let temp = [...tasks];
    const task = temp.find((task) => task.id === id);
    if (task) {
      task.state = StateTask.COMPLETED;
      temp = sortTasks({ tasks: temp });
      addTasks({ tasks: temp });
      setTasks([...temp]);
    }
  };

  const undoTask = (id: number) => {
    let temp = [...tasks];
    const task = temp.find((task) => task.id === id);
    if (task) {
      task.state = StateTask.PEDDING;
      temp = sortTasks({ tasks: temp });
      setTasks([...temp]);
    }
  };

  const deleteTask = (id: number) => {
    let temp = [...tasks];
    temp = temp.filter((task) => task.id !== id);
    setTasks([...temp]);
  };

  return (
    <>
      <header>
        <h1>Lista de Tareas</h1>
      </header>
      <main>
        <section className="container-todo-list">
          <div className="actions">
            <button
              className="btn-add"
              onClick={() => {
                handleAddTask({ addTask });
              }}
            >
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
                  deleteTask={() => {
                    handleDeleteTask({ deleteTask, id: task.id });
                  }}
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
