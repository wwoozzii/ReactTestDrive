import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import type { Task } from "../../types/index.js";

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  searchTask: string;
  category: "all" | "active" | "completed";
  isAddMode: boolean;
  isSearchMode: boolean;
  editTaskId: number | null;
  handlerId: boolean;
  ruleShowButton: boolean;
  onAdd: (text: string) => void;
  onDelete: (id: number) => void;
  onSave: (id: number, text: string) => void;
  onToggle: (id: number) => void;
  setCategory: (cat: "all" | "active" | "completed") => void;
  setSearchTask: (text: string) => void;
  setIsAddMode: (value: boolean) => void;
  setIsSearchMode: (value: boolean) => void;
  setEditTaskId: (id: number | null) => void;
  setHandlerId: (value: boolean) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("todo-task-app", []);
  const [searchTask, setSearchTask] = useState("");
  const [category, setCategory] = useState<"all" | "active" | "completed">(
    "all",
  );
  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const [handlerId, setHandlerId] = useState<boolean>(false);
  const ruleShowButton = !isAddMode && !isSearchMode && !handlerId;

  //for EditMode click outside handler
  useEffect(() => {
    if (editTaskId !== null) {
      setHandlerId(true);
    }
    if (editTaskId === null) {
      setHandlerId(false);
    }
  }, [editTaskId]);

  const onAdd = (text: string) => {
    setTasks((prev) => [
      {
        id: Date.now(),
        name: text,
        completed: false,
        createDat: Date.now(),
      },
      ...prev,
    ]);
  };

  const onDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const onToggle = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const onSave = (id: number, text: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, name: text } : t)),
    );
  };

  const filteredTasks = useMemo(() => {
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    return safeTasks.filter((task) => {
      const matchesSearch = task.name
        .toLowerCase()
        .includes(searchTask.toLowerCase());

      if (!matchesSearch) return false;
      if (category === "active") return !task.completed;
      if (category === "completed") return task.completed;
      return true; //all
    });
  }, [tasks, category, searchTask]);

  //free value
  const value: TaskContextType = {
    tasks: tasks || [],
    filteredTasks: filteredTasks || [],
    searchTask,
    category,
    isAddMode,
    isSearchMode,
    editTaskId,
    handlerId,
    ruleShowButton,
    onAdd,
    onDelete,
    onSave,
    onToggle,
    setCategory,
    setSearchTask,
    setIsAddMode,
    setIsSearchMode,
    setEditTaskId,
    setHandlerId,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
