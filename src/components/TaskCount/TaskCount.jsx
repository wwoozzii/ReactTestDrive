import s from "./TaskCount.module.scss";

export function TaskCount({ tasks = [] }) {
  const completedCount = tasks.reduce((acc, tasks) => {
    if (tasks.completed) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className={s.count}>
      Выполнено: {completedCount} из {tasks.length}
    </div>
  );
}
