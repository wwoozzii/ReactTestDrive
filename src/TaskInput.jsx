import { useState } from "react";

export const TaskInput = ({ onAdd }) => {
  const [inputTasks, setInputTask] = useState("");

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
        value={inputTasks}
        onChange={(e) => setInputTask(e.target.value)}
      ></input>
      <button onClick={handleAddClick}>add</button>
    </>
  );
};
