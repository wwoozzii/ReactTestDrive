import type { IdAction, IdTextAction, Task } from "../../types/index.js";
import { TaskItem } from "../TaskItem/TaskItem.js";
import s from "./TaskList.module.scss";

interface Props {
  tasks: Task[];
  onDelete: IdAction;
  onToggle: IdAction;
  onSave: IdTextAction;
}

export function TaskList({ tasks = [], onDelete, onToggle, onSave }: Props) {
  return (
    <div className={s.listContainer}>
      {tasks.filter(Boolean).map((t) => (
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
