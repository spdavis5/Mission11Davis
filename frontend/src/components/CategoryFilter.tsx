import { useEffect, useState } from 'react';
import './CategoryFilter.css';

/**
 * CategoryFilter component that allows filtering by book categories
 * @param selectedCategories - Array of currently selected categories
 * @param setSelectedCategories - Function to update selected categories
 */
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (selectedCategories: string[]) => void;
}) {
  // State to store all available categories
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories from API on component mount
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

  /**
   * Handles checkbox selection changes
   * If category already selected, removes it from selection
   * If not selected, adds it to selection
   */
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value) // Remove if already selected
      : [...selectedCategories, target.value]; // Add if not selected
    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <div className="category-filter">
        <h5>Filter by Category</h5>
        {/* Display list of all available categories */}
        <div className="category-list">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
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
