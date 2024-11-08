import React, { useState } from 'react';

const CategoryForm = ({ saveCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categoryName) {
      const newCategory = { name: categoryName };
      saveCategory(newCategory); // Pass the category data to parent component
      setCategoryName(''); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryForm;