import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

/**
 * BooksPage component - Main page for browsing and filtering books
 * Displays the book catalog with filtering functionality
 */
function BooksPage() {
  // State to track which categories are currently selected for filtering
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {/* Shopping cart summary display */}
      <CartSummary />

      <div className="row">
        {/* Welcome banner at the top of the page */}
        <div className="row bg-primary text-white p-3">
          <WelcomeBand />
        </div>

        {/* Left sidebar with category filter options */}
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* Main content area showing filtered book list */}
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
