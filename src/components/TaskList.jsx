import { TaskItem } from "./taskItem";

export const TaskList = ({ tasks, onDelete, onToggle, onSave }) => {
  return (
    <div className="task-list">
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
};
