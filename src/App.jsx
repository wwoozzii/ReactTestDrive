import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTasks, setInputTask] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingvalue, setEditingValue] = useState("");

  const [category, setCategory] = useState("all"); // 'all', 'active', 'complited'

  function addTaskBtn() {
    if (inputTasks === "") return;

    setTasks((prev) => [
      { id: Date.now(), name: inputTasks, complited: false },
      ...prev,
    ]);
    setInputTask("");
  }

  function deleteTaskBtn(id) {
    setTasks(tasks.filter((massiv) => massiv.id !== id));
  }

  function startEditTask(id, name) {
    setEditingId(id);
    setEditingValue(name);
    console.log("start edit:", id, name);
  }

  function saveEdit(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: editingvalue } : task,
      ),
    );
    setEditingValue("");
    setEditingId(null);
  }

  const filteredTasks = tasks.filter((task) => {
    if (category === "active") return !task.complited;
    if (category === "complited") return task.complited;
    return true; //all
  });

  function toggleComplited(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complited: !task.complited } : task,
      ),
    );
    console.log("complited");
  }

  return (
    <>
      {/*кнопки фильтрации */}
      <button
        onClick={() => {
          setCategory("all");
        }}
      >
        All
      </button>
      <button
        onClick={() => {
          setCategory("active");
        }}
      >
        Active
      </button>
      <button
        onClick={() => {
          setCategory("complited");
        }}
      >
        Complited
      </button>

      {/*добавление задачи */}
      <input
        type="text"
        value={inputTasks}
        onChange={(e) => setInputTask(e.target.value)}
      ></input>
      <button onClick={addTaskBtn}>add</button>

      {filteredTasks.map((massiv) => (
        <div key={massiv.id}>
          {editingId === massiv.id ? (
            <>
              <button
                onClick={() => {
                  saveEdit(massiv.id);
                }}
              >
                save
              </button>

              <input
                type="text"
                value={editingvalue}
                onChange={(e) => setEditingValue(e.target.value)}
              ></input>
            </>
          ) : (
            massiv.name
          )}
          <button
            onClick={() => {
              startEditTask(massiv.id, massiv.name);
            }}
          >
            edit
          </button>
          <button
            onClick={() => {
              toggleComplited(massiv.id);
            }}
          >
            complited
          </button>
          <button
            onClick={() => {
              deleteTaskBtn(massiv.id);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </>
  );
}
export default App;
