import { useState } from "react";
import type { Task } from "../../types/index.js";
import { useTasks } from "../context/TaskContext.js";

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
      <input
        type="text"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
        autoFocus
      ></input>
      <button onClick={handleSaveClick}>✅ Save</button>
      <button onClick={onClose}>❌ Cancel</button>
    </>
  );
}
