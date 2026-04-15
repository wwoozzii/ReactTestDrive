import { useEffect, useRef, useState } from "react";
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

    setIsButtActive(false);
  };

  useEffect(() => {
    if (isButtActive && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isButtActive]);

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
            autoFocus
          ></input>
          <button
            onClick={() => {
              handleAddClick();
              //   inputRef.current?.focus();
              //оказалось что действие фокуса было перекрыто чем то ниже, ок.. просто удали потом
              // тут под сомнением тк потом с модалкой не нужно будет сохранять фокус,
              //  ведь именно эта кнопка будет финальной(закрывать модалку)
            }}
          >
            add
          </button>
        </div>
      ) : (
        <div className={s.plusContainer}>
          <button
            className={s.plusButton}
            onClick={() => setIsButtActive(true)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
