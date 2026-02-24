import { useRef, useState } from "react";

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
    <>
      {/*добавление задачи */}
      <input
        type="text"
        ref={inputRef}
        value={inputTasks}
        onKeyDown={handleAddEnter}
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
    </>
  );
};
