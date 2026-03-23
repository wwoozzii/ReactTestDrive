import { useRef, useState } from "react";
import { useTasks } from "../context/TaskContext.js";
import s from "./TaskInput.module.scss";

export const TaskInput = () => {
  const [isButtActive, setIsButtActive] = useState(false);
  const [inputTasks, setInputTask] = useState("");
  const { onAdd } = useTasks();

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
    <div>
      {isButtActive ? (
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
      ) : (
        <div className={s.plusContainer}>
          <button onClick={() => setIsButtActive(true)}>+</button>
        </div>
      )}
    </div>
  );
};
