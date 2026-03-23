import type { Task } from "../../types/index.js";
import { useTasks } from "../context/TaskContext.js";
import { TaskItem } from "../TaskItem/TaskItem.js";
import s from "./TaskList.module.scss";

export function TaskList() {
  const { filteredTasks, onDelete, onToggle, onSave } = useTasks();
  const safeTasks = filteredTasks || [];

  return (
    <div className={s.listContainer}>
      {safeTasks.filter(Boolean).map((t: Task) => (
        <TaskItem
          key={t.id}
          task={t}
          onDelete={onDelete}
          onToggle={onToggle}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
