import { useRef, useState } from "react";
import type { TextAction } from "../../types/index.js";
import s from "./TaskInput.module.scss";

interface Props {
  onAdd: TextAction;
}

export const TaskInput = ({ onAdd }: Props) => {
  const [inputTasks, setInputTask] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddClick();
    }
  };

  const handleAddClick = () => {
    if (inputTasks.trim() === "") return;

    const readyAddText = inputTasks.trim();
    if (!readyAddText) return;
    onAdd(readyAddText);
    setInputTask("");
  };

  return (
    <div className={s.InputContainer}>
      <input
        type="text"
        ref={inputRef}
        value={inputTasks}
        onKeyDown={handleAddEnter}
        placeholder="New task..."
        onChange={(e) => setInputTask(e.target.value)}
      ></input>
      <button
        onClick={() => {
          handleAddClick();
          inputRef.current?.focus();
        }}
      >
        add
      </button>
    </div>
  );
};
