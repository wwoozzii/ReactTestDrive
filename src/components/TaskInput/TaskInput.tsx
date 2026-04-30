import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useClisckOutSide } from "../../hooks/useClickOutSide.js";
import { useTasks } from "../context/TaskContext.js";
import s from "./TaskInput.module.scss";

export const TaskInput = () => {
  const { onAdd, isAddMode, setIsAddMode } = useTasks();
  const [inputTasks, setInputTask] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const containerRef = useClisckOutSide<HTMLDivElement>(() => {
    setIsAddMode(false);
  }, isAddMode);

  const handleAddClick = () => {
    if (inputTasks.trim() === "") return;

    const readyAddText = inputTasks.trim();
    if (!readyAddText) return;
    onAdd(readyAddText);
    setInputTask("");
    setIsAddMode(false);
  };

  const handleAddEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleAddClick();
    }
  };

  useEffect(() => {
    if (isAddMode && containerRef.current) {
      const timer = setTimeout(() => {
        containerRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isAddMode]);

  return (
    <div>
      {isAddMode ? (
        <div className={s.InputContainer} ref={containerRef}>
          <TextareaAutosize
            cacheMeasurements
            className={s.InputTextarea}
            ref={textareaRef}
            value={inputTasks}
            placeholder="New task..."
            autoFocus={true}
            onChange={(e) => setInputTask(e.target.value)}
            onKeyDown={handleAddEnter}
            minRows={1}
            maxRows={5}
          />
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
          <button className={s.plusButton} onClick={() => setIsAddMode(true)}>
            +
          </button>
        </div>
      )}
    </div>
  );
};
