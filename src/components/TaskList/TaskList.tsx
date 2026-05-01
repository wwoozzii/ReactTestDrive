import type { Task } from "../../types/index.js";
import { useTasks } from "../context/TaskContext.js";
import { TaskItem } from "../TaskItem/TaskItem.js";
import { TaskSearch } from "../TaskSearch/TaskSearch.js";
import s from "./TaskList.module.scss";

export function TaskList() {
  const {
    filteredTasks,
    setSearchTask,
    isSearchMode,
    setIsSearchMode,
    isAddMode,
    handlerId,
    ruleShowButton,
  } = useTasks();
  const safeTasks = Array.isArray(filteredTasks) ? filteredTasks : [];

  return (
    <div className={s.listContainer}>
      {isSearchMode ? (
        <TaskSearch onSearch={(text) => setSearchTask(text)} />
      ) : ruleShowButton ? (
        <button
          className={s.SearchButton}
          onClick={() => setIsSearchMode(!isSearchMode)}
        >
          Click for task search
        </button>
      ) : null}
      {safeTasks.filter(Boolean).map((t: Task) => (
        <TaskItem key={t.id} task={t} />
      ))}
      {safeTasks.length === 0 && <p>Nothing found..</p>}
    </div>
  );
}
