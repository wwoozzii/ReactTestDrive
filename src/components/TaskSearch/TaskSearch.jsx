import { useState } from "react";

export function TaskSearch({ onSearch }) {
  const [inputSearch, setInputSearch] = useState("");

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    const searchText = inputSearch.trim();
    onSearch(searchText);
  };

  const handleResetClick = () => {
    onSearch("");
    setInputSearch("");
  };

  return (
    <div>
      <input
        type="text"
        value={inputSearch}
        onKeyDown={handleSearchEnter}
        placeholder="Search..."
        onChange={(e) => setInputSearch(e.target.value)}
      ></input>
      <button onClick={(e) => handleSearchClick()}>Search</button>
      <button onClick={(e) => handleResetClick()}>Reset</button>
    </div>
  );
}
