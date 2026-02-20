import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTasks, setInputTask] = useState("");

  const [editingId, setEditingId] = useState(null); //запоминаю кого (что) редактирую, (id)
	const [editingvalue, setEditingValue] = useState(""); // запоминаю текст из редактора для вставки в (name)
	// начало: функция в которую передаю id и name, вызов при клике на изменить




  function addTaskBtn() {
    if (inputTasks === "") return;

    setTasks([{ id: Date.now(), name: inputTasks }, ...tasks]);
    setInputTask("");
  }

  function deleteTaskBtn(id) {
    setTasks(tasks.filter((massiv) => massiv.id !== id));
  }

  return (
    <>
      <input
        type="text"
        value={inputTasks}
        onChange={(e) => setInputTask(e.target.value)}
      ></input>
      <button onClick={addTaskBtn}>add</button>
      {tasks.map((massiv) => (
        <div key={massiv.id}>
          {massiv.name}
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
