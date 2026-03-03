import s from "./TaskCount.module.scss";

export function TaskCount({ tasks = [] }) {
  const completedCount = tasks.reduce(
    (acc, tasks) => (tasks.completed ? acc + 1 : acc),
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
      {/* Маленький бонус: полоска прогресса */}
      <div className={s.progressBar}>
        <div
          className={s.progressFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
