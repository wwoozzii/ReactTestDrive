export function TaskFilter({ currentCategory, onCategoryChange }) {
  const categories = ["all", "active", "completed"];

  return (
    <div className="filter-buttons">
      {categories.map((categories) => (
        <button
          key={categories}
          onClick={() => onCategoryChange(categories)}
          //   className={currentCategory === cat ? "btn active" : "btn"}
        >
          {categories}
        </button>
      ))}
    </div>
  );
}
