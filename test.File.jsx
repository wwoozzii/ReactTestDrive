import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTasks, setInputTask] = useState("");

  function addTaskBtn() {
    if (inputTasks === "") return;

    setTasks([{ id: Date.now(), name: inputTasks }, ...tasks]);
    setInputTask("");
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
        <div key={massiv.id}>{massiv.name}</div>
      ))}
    </>
  );
}
export default App;

function App() {
  const [newEditTask, setNewEditTask] = useState([]);
  const [editingId, setEditingId] = useState(null);

  function updateItem(id, newName) {
    setItems(
      items.map((item) => (item.id === id ? { ...item, name: newName } : item)),
    );
    setEditingId(null);
  }

  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          {" "}
          {/* key помогает React понять, какой элемент изменился */}
          {editingId === item.id ? (
            <InlineEdit
              item={item}
              onSave={(newName) => updateItem(item.id, newName)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              {item.name}
              <button onClick={() => setEditingId(item.id)}>✏️</button>
            </>
          )}
        </div>
      ))}
    </>
  );
}
