import { useState } from "react";

export function TaskItem({ task, onDelete, onToggle, onSave }) {
  const [editInput, setEditInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = () => {
    if (editInput.trim() === "") return;

    const readySaveText = editInput.trim();
    if (!readySaveText) return;
    onSave(task.id, readySaveText);
    setEditInput("");
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        // -------- режим редактора
        <>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            autoFocus
          ></input>
          <button onClick={handleSaveClick}>✅ Save</button>
          <button onClick={() => setIsEditing(false)}>❌ Cencel</button>
        </>
      ) : (
        // -------- стандартный режим
        <>
          <span
            onClick={() => onToggle(task.id)}
            style={{
              cursor: "pointer",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.name}
          </span>

          <button
            onClick={() => {
              (setEditInput(task.name), setIsEditing(true));
            }}
          >
            Edit
          </button>
          <button onClick={() => onToggle(task.id)}> Done</button>
          <button onClick={() => onDelete(task.id)}> Delete</button>
        </>
      )}
    </div>
  );
}
