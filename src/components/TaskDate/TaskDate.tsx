import type { Task } from "../../types/index.js";

interface Props {
  task: Task;
}
const dateFormatter = new Intl.DateTimeFormat("ru-Ru", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function TaskDate({ task }: Props) {
  const dateString = task.createDat
    ? dateFormatter.format(new Date(task.createDat))
    : "";

  return <>{dateString && <span>{dateString}</span>}</>;
}
