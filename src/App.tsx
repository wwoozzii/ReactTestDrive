import { useMemo, useState } from "react";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import type {
	IdAction,
	IdTextAction,
	Task,
	TextAction,
} from "./types/index.js";

import {
	TaskCount,
	TaskFilter,
	TaskInput,
	TaskList,
	TaskSearch,
} from "./components/index.js";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("", []);
  const [searchTask, setSearchTask] = useState("");
  //API
  //   const [advice, setAdvice] = useState("");
  //   const [imageUrl, setImageUrl] = useState<string | null>(null);

  const addTask: TextAction = (text) => {
    setTasks((prev) => [
      {
        id: Date.now(),
        name: text,
        completed: false,
      },
      ...prev,
    ]);
  };

  const deleteTask: IdAction = (id) => {
    setTasks((prev) => prev.filter((massiv) => massiv.id !== id));
  };

  const onSave: IdTextAction = (id, text) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, name: text } : task)),
    );
  };
  const [category, setCategory] = useState<"all" | "active" | "completed">(
    "all",
  );

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const safeSearch = (searchTask || "").toLowerCase();

    return safeTasks.filter((task) => {
      if (!task) return false;
      const safeTitle = (task.name || "").toLowerCase();

      const matchesSearch = safeTitle.includes(safeSearch);
      if (!matchesSearch) return false;

      if (category === "active") return !task.completed;
      if (category === "completed") return task.completed;
      return true; //all
    });
  }, [tasks, category, searchTask]);

  const onToggle: IdAction = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const onSearch: TextAction = (text) => {
    setSearchTask(text);
  };

  //   const handleGetAdvice = async () => {
  //     const text = await getRandomAdvice();
  //     setAdvice(text);
  //   };

  //   const handleGetImage = async () => {
  //     const image = await getRandomImage();
  //     setImageUrl(image);
  //   };

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
