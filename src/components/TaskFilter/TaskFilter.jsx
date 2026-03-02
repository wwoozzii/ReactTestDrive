import cn from "classnames";
import s from "./TaskFilter.module.scss";

export function TaskFilter({ currentCategory, onCategoryChange }) {
  const categories = ["all", "active", "completed"];

  return (
    <div className={s.filterContainer}>
      {categories.map((cat) => (
        <button
          className={cn(s.button, {
            [s.completed]: currentCategory === cat,
          })}
          key={cat}
          onClick={() => onCategoryChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
