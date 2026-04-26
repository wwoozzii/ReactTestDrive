import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import type { Task } from "../../types/index.js";
import { useTasks } from "../context/TaskContext.js";
import s from "../EditMode/EditMode.module.scss";

interface EditModeProps {
  task: Task;
  onClose: () => void;
}

export function EditMode({ task, onClose }: EditModeProps) {
  const { onSave } = useTasks();
  const [editInput, setEditInput] = useState(task.name);
  //   const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = () => {
    if (editInput.trim() === "") return;
    const readySaveText = editInput.trim();
    if (!readySaveText) return;

    onSave(task.id, readySaveText);
    setEditInput("");
    onClose();
  };

  return (
    // -------- режим редактора
    <>
      {/* <input
        type="text"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
        autoFocus
      ></input> */}
      <TextareaAutosize
        cacheMeasurements
        className={s.InputTextarea}
        value={editInput}
        autoFocus={true}
        onChange={(e) => setEditInput(e.target.value)}
        minRows={1}
        maxRows={5}
      />
      <button onClick={handleSaveClick}>✅ Save</button>
      <button onClick={onClose}>❌ Cancel</button>
    </>
  );
}
