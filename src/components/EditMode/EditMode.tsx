import { useEffect, useRef, useState } from "react";
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
  const editRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editRef.current) {
      const erc = editRef.current;
      erc.setSelectionRange(erc.value.length, erc.value.length);
    }
  }, []);

  const handleSaveEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

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
    <div className={s.EditContainer}>
      <TextareaAutosize
        ref={editRef}
        className={s.InputTextarea}
        value={editInput}
        autoFocus={true}
        onChange={(e) => setEditInput(e.target.value)}
        onKeyDown={handleSaveEnter}
        cacheMeasurements
        minRows={1}
        maxRows={5}
      />
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
}
