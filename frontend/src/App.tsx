import { useState } from 'react';
import './App.css';
import BookList from './BookList';
import CategoryFilter from './CategoryFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeBand from './WelcomeBand';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="row bg-primary text-white p-3">
            <WelcomeBand />
          </div>
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
