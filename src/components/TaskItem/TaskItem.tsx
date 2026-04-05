import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Task } from "../../types/index.js";
import { useTasks } from "../context/TaskContext.js";
import { EditMode } from "../EditMode/EditMode.js";
import s from "./TaskItem.module.scss";

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const { onDelete, onToggle } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [isKebab, setIsKebab] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        isKebab &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsKebab(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isKebab]);

  return (
    <div
      className={cn(s.itemCard, {
        [s.completed as string]: task.completed,
        [s.activtask as string]: !task.completed,
      })}
    >
      {isEditing ? (
        <EditMode task={task} onClose={() => setIsEditing(false)} />
      ) : (
        <div>
          <span>{task.name}</span>
          <div className={s.kebabContainer} ref={menuRef}>
            <button
              className={s.kebabButton}
              onClick={() => setIsKebab(!isKebab)}
            >
              <MoreVertical size={20} color="#000000" strokeWidth={1.5} />
            </button>
            <div>
              <AnimatePresence>
                {isKebab && (
                  <motion.div
                    className={s.kebabMenuButton}
                    style={{ originX: 1, originY: 0 }}
                    initial={{ opacity: 0, scale: 0.5, x: 10, y: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: 10, y: -10 }}
                    transition={{ duration: 0.19, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <button
                      onClick={() => {
                        onToggle(task.id);
                        setIsKebab(false);
                      }}
                    >
                      {" "}
                      Done
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setIsKebab(false);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(task.id);
                        setIsKebab(false);
                      }}
                    >
                      {" "}
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
