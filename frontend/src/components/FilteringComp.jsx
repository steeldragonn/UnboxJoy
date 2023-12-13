import React, { useState } from "react";

const FilteringComponent = ({ onFilterChange }) => {
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ category: categoryFilter });
  };

  return (
    <div>
      <label>Category:</label>
      <input
        type="text"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default FilteringComponent;
