import { TaskItem } from "../";
import s from "./TaskList.module.scss";

export function TaskList({ tasks, onDelete, onToggle, onSave }) {
  return (
    <div className={s.listContainer}>
      {tasks.map((item) => (
        <TaskItem
          key={item.id}
          task={item}
          onDelete={onDelete}
          onToggle={onToggle}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
