import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useClisckOutSide } from "../../hooks/useClickOutSide.js";
import type { Task } from "../../types/index.js";
import { useTasks } from "../context/TaskContext.js";
import { EditMode } from "../EditMode/EditMode.js";
import { TaskDate } from "../TaskDate/TaskDate.js";
import s from "./TaskItem.module.scss";

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const {
    onDelete,
    onToggle,
    setIsAddMode,
    isAddMode,
    setEditTaskId,
    editTaskId,
  } = useTasks();

  const isEdit = task.id === editTaskId;
  const [isKebab, setIsKebab] = useState(false);

  const menuRef = useClisckOutSide<HTMLDivElement>(() => {
    setIsKebab(false);
  }, isKebab);

  useEffect(() => {
    if (isEdit) {
      setIsAddMode(false);
    }
  }, [isEdit, setIsAddMode]);

  useEffect(() => {
    if (isAddMode) {
      setEditTaskId(null);
    }
  }, [isAddMode, setEditTaskId]);

  return (
    <div
      className={cn(s.itemCard, {
        [s.completed as string]: task.completed,
        [s.activtask as string]: !task.completed,
      })}
    >
      {isEdit ? (
        <EditMode task={task} onClose={() => setEditTaskId(null)} />
      ) : (
        <div>
          <span>{task.name}</span>
          <div className={s.kebabContainer} ref={menuRef}>
            <button
              className={cn(s.kebabButton, {
                [s.completed as string]: task.completed,
              })}
              onClick={() => setIsKebab(!isKebab)}
            >
              <MoreVertical size={20} color="currentColor" strokeWidth={1.5} />
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
                        setEditTaskId(task.id);
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
      <div
        className={cn(s.dateContainer, {
          [s.completed as string]: task.completed,
          [s.active as string]: !task.completed,
        })}
      >
        <TaskDate task={task} />
      </div>
    </div>
  );
}
