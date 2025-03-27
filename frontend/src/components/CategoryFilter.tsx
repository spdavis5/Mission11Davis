import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (selectedCategories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5005/api/Book/GetProjectTypes'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('There was an error fetching the categories: ', error);
      }
    };

    fetchCategories();
  }, []);

  //Handle Checkbox Change function
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <div className="category-filter">
        <h5>Filter by Category</h5>
        <div className="category-list">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
                // Check if the category is selected
                onChange={handleCheckboxChange}
              />
              <label htmlFor={c} className="category-text">
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
