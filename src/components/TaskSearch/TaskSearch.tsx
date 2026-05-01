import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useClisckOutSide } from "../../hooks/useClickOutSide.js";
import { useTasks } from "../context/TaskContext.js";
import s from "./TaskSearch.module.scss";

interface Props {
  onSearch: (text: string) => void;
}

export function TaskSearch({ onSearch }: Props) {
  const [inputSearch, setInputSearch] = useState("");
  const { setIsSearchMode, isSearchMode, setIsAddMode, isAddMode, editTaskId } =
    useTasks();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const containerRef = useClisckOutSide<HTMLDivElement>(() => {
    setIsSearchMode(false);
  }, isSearchMode);

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    onSearch(inputSearch.trim());
  };

  const handleResetClick = () => {
    onSearch("");
    setInputSearch("");
  };

  const handleCloseClick = () => {
    onSearch("");
    setIsSearchMode(false);
  };

  useEffect(() => {
    if (isSearchMode) {
      setIsAddMode(false);
    }
  }, [isSearchMode]);

  useEffect(() => {
    if (editTaskId !== null) {
      setIsSearchMode(false);
    }
  }, [editTaskId]);

  useEffect(() => {
    if (isAddMode) {
      setIsSearchMode(false);
    }
  }, [isAddMode]);

  return (
    <div className={s.SearchContainer} ref={containerRef}>
      <TextareaAutosize
        ref={textareaRef}
        className={s.InputTextarea}
        value={inputSearch}
        autoFocus={true}
        onChange={(e) => setInputSearch(e.target.value)}
        onKeyDown={handleSearchEnter}
        cacheMeasurements
        minRows={1}
        maxRows={5}
      />
      <button onClick={handleSearchClick}>Search</button>
      <button onClick={handleCloseClick}>Close</button>
    </div>
  );
}
