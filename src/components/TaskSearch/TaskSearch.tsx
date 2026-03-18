import { useState } from "react";

interface Props {
  onSearch: (text: string) => void;
}

export function TaskSearch({ onSearch }: Props) {
  const [inputSearch, setInputSearch] = useState("");

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <div>
      <input
        type="text"
        value={inputSearch}
        onKeyDown={handleSearchEnter}
        placeholder="Search..."
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <button onClick={handleSearchClick}>Search</button>
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
}
