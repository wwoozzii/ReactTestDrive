import { TaskItem } from "../TaskItem/TaskItem";
import s from "./TaskList.module.scss";

export function TaskList({ tasks = [], onDelete, onToggle, onSave }) {
  return (
    <div className={s.listContainer}>
      {tasks.filter(Boolean).map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
