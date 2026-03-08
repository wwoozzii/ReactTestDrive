import { useMemo, useState } from "react";
import "./App.css";
//src/App.jsx
import {
	TaskCount,
	TaskFilter,
	TaskInput,
	TaskList,
	TaskSearch,
} from "./components";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTask, setSearchTask] = useState("");

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
  const [category, setCategory] = useState("all");

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    const safeSearch = (searchTask || "").toLowerCase();

    return tasks.filter((task) => {
      const safeTitle = (task.name || "").toLowerCase();

      const matchesSearch = safeTitle.includes(safeSearch);
      if (!matchesSearch) return false;

      if (category === "active") return !task.completed;
      if (category === "completed") return task.completed;
      return true; //all
    });
  }, [tasks, category, searchTask]);

  const onToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const onSearch = (searchText) => {
    setSearchTask(searchText);
  };

  return (
    <div className="app">
      <TaskInput onAdd={addTask} />
      <TaskFilter currentCategory={category} onCategoryChange={setCategory} />

      <TaskCount tasks={filteredTasks} />
      <TaskSearch onSearch={onSearch} />
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
