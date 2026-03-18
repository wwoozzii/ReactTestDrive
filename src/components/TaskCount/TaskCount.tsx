import type { Task } from "../../types/index.js";
import s from "./TaskCount.module.scss";

interface TaskCountProps {
  tasks: Task[];
}

export function TaskCount({ tasks = [] }: TaskCountProps) {
  const completedCount = tasks.reduce(
    (acc, task) => (task.completed ? acc + 1 : acc),
    0,
  );

  const total = tasks.length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className={s.countContainer}>
      <p>
        Выполнено: <span className={s.highlight}>{completedCount}</span> из{" "}
        {total}
      </p>
      <div className={s.progressBar}>
        <div
          className={s.progressFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
