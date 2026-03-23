import cn from "classnames";
import { useTasks } from "../context/TaskContext.js";
import s from "./TaskFilter.module.scss";

export function TaskFilter() {
  const { category, setCategory } = useTasks();
  const categories = ["all", "active", "completed"] as const;
  return (
    <div className={s.filterContainer}>
      {categories.map((cat) => (
        <button
          className={cn(s.button, {
            [s.completed as string]: category === cat,
          })}
          key={cat}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
