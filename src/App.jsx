import { useMemo, useState } from "react";
import "./App.css";
//src/App.jsx
import { TaskCount, TaskFilter, TaskInput, TaskList } from "./components";

function App() {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState("all"); // 'all', 'active', 'completed'

  const addTask = (readyAddText) => {
    setTasks((prev) => [
      {
        id: Date.now(),
        name: readyAddText,
        completed: false,
      },
      ...prev,
    ]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((massiv) => massiv.id !== id));
  };

  const onSave = (id, readySaveText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: readySaveText } : task,
      ),
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (category === "active") return !task.completed;
      if (category === "completed") return task.completed;
      return true; //all
    });
  }, [tasks, category]);

  function onToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
    console.log("completed");
  }

  return (
    <div className="app">
      <TaskInput onAdd={addTask} />
      <TaskFilter currentCategory={category} onCategoryChange={setCategory} />
      <TaskCount tasks={filteredTasks} />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={onToggle}
        onSave={onSave}
      />
    </div>
  );
}
export default App;
