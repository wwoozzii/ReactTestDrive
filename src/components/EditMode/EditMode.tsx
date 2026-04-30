import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useClisckOutSide } from "../../hooks/useClickOutSide.js";
import type { Task } from "../../types/index.js";
import { useTasks } from "../context/TaskContext.js";
import s from "../EditMode/EditMode.module.scss";

interface EditModeProps {
  task: Task;
  onClose: () => void;
}
export function EditMode({ task, onClose }: EditModeProps) {
  const { onSave, setEditTaskId, editTaskId } = useTasks();
  const [editInput, setEditInput] = useState(task.name);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const containerRef = useClisckOutSide<HTMLDivElement>(() => {
    setEditTaskId(null);
  }, editTaskId !== null);

  useEffect(() => {
    if (textareaRef.current) {
      const erc = textareaRef.current;
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
    <div className={s.EditContainer} ref={containerRef}>
      <TextareaAutosize
        ref={textareaRef}
        className={s.InputTextarea}
        value={editInput}
        autoFocus={true}
        onChange={(e) => setEditInput(e.target.value)}
        onKeyDown={handleSaveEnter}
        cacheMeasurements
        minRows={1}
        maxRows={5}
      />
      <div className={s.ButtonContainer}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
}
