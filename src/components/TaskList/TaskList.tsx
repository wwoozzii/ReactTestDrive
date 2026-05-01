import type { Task } from "../../types/index.js";
import { useTasks } from "../context/TaskContext.js";
import { TaskItem } from "../TaskItem/TaskItem.js";
import { TaskSearch } from "../TaskSearch/TaskSearch.js";
import s from "./TaskList.module.scss";

export function TaskList() {
  const { filteredTasks, setSearchTask } = useTasks();
  const safeTasks = Array.isArray(filteredTasks) ? filteredTasks : [];

  return (
    <div className={s.listContainer}>
      <TaskSearch onSearch={(text) => setSearchTask(text)} />
      {safeTasks.filter(Boolean).map((t: Task) => (
        <TaskItem key={t.id} task={t} />
      ))}
      {safeTasks.length === 0 && <p>Nothing found..</p>}
    </div>
  );
}
