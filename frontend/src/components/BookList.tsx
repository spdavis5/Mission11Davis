import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5005/api/Book?pageHowMany=${pageSize}&pageNumber=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleAddToCart = (book: Book) => {
    addToCart({
      bookID: book.bookID,
      title: book.title,
      price: book.price,
    });
  };

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-auto">
          <button className="btn btn-secondary" onClick={toggleSortOrder}>
            Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {books.map((b) => (
          <div className="col" key={b.bookID}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">{b.title}</h3>
                <ul className="list-unstyled">
                  <li>
                    <strong>Author: </strong>
                    {b.author}
                  </li>
                  <li>
                    <strong>Category: </strong>
                    {b.category}
                  </li>
                  <li>
                    <strong>Price: </strong>${b.price.toFixed(2)}
                  </li>
                </ul>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(b)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(`/purchase/${b.title}/${b.bookID}`)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-3">
        <div className="col d-flex justify-content-center">
          <div className="btn-group" role="group">
            <button
              className="btn btn-secondary"
              disabled={pageNum === 1}
              onClick={() => setPageNum(pageNum - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn ${pageNum === index + 1 ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setPageNum(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="btn btn-secondary"
              disabled={pageNum === totalPages}
              onClick={() => setPageNum(pageNum + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <select
            className="form-select w-auto mx-auto"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default BookList;
