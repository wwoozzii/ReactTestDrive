import cn from "classnames";
import s from "./TaskFilter.module.scss";

type Category = "all" | "active" | "completed";
interface Props {
  currentCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function TaskFilter({ currentCategory, onCategoryChange }: Props) {
  const categories: Category[] = ["all", "active", "completed"];

  return (
    <div className={s.filterContainer}>
      {categories.map((cat) => (
        <button
          className={cn(s.button, {
            [s.completed as string]: currentCategory === cat,
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
