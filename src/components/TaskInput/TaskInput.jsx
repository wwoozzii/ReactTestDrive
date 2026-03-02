import { useRef, useState } from "react";
import s from "./TaskInput.module.scss";

export const TaskInput = ({ onAdd }) => {
  const [inputTasks, setInputTask] = useState("");

  const inputRef = useRef();

  const handleAddEnter = (e) => {
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
          inputRef.current.focus();
        }}
      >
        add
      </button>
    </div>
  );
};
