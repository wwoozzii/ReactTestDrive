import cn from "classnames";
import { useState } from "react";
import type { IdAction, IdTextAction, Task } from "../../types/index.js";
import s from "./TaskItem.module.scss";

interface Props {
  task: Task;
  onDelete: IdAction;
  onToggle: IdAction;
  onSave: IdTextAction;
}

export function TaskItem({ task, onDelete, onToggle, onSave }: Props) {
  const [editInput, setEditInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = () => {
    if (editInput.trim() === "") return;

    const readySaveText = editInput.trim();
    if (!readySaveText) return;
    onSave(task.id, readySaveText);
    setEditInput("");
    setIsEditing(false);
  };

  return (
    <div
      className={cn(s.itemCard, {
        [s.completed as string]: task.completed,
        [s.activtask as string]: !task.completed,
      })}
    >
      {isEditing ? (
        // -------- режим редактора
        <>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            autoFocus
          ></input>
          <button onClick={handleSaveClick}>✅ Save</button>
          <button onClick={() => setIsEditing(false)}>❌ Cencel</button>
        </>
      ) : (
        // -------- стандартный режим
        // три точки меню которые при нажатии показывают блок меню с тремя кнопками, прямо как в инпуте плюс
        <>
          <span onClick={() => onToggle(task.id)}>{task.name}</span>

          <button
            onClick={() => {
              (setEditInput(task.name), setIsEditing(true));
            }}
          >
            Edit
          </button>
          <button onClick={() => onToggle(task.id)}> Done</button>
          <button onClick={() => onDelete(task.id)}> Delete</button>
        </>
      )}
    </div>
  );
}
