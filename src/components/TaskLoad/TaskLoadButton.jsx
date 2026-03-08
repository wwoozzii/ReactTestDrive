// src/components/TaskLoad/TaskLoadButton.jsx
import { useState } from "react";
import { TaskLoading } from "./TaskLoading";

export function TaskLoadButton() {
  const [showLoader, setShowLoader] = useState(false);

  if (showLoader) {
    return <TaskLoading />;
  }

  return (
    <div>
      <button onClick={() => setShowLoader(true)}>Загрузить</button>
    </div>
  );
}
