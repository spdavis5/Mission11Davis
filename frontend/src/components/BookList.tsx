// Updated BookList.tsx
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
        .map((cat) => `categoryTypes=${encodeURIComponent(cat)}`)
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

  return (
    <div className="container">
      <div className="mb-3">
        <button className="btn btn-secondary mb-3" onClick={toggleSortOrder}>
          Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      {books.map((b) => (
        <div id="bookCard" className="card mb-3" key={b.bookID}>
          <div className="card-body">
            <h3 className="card-title">{b.title}</h3>
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>
                {b.price}
              </li>
            </ul>
            <button
              className="btn btn-success me-2"
              onClick={() =>
                addToCart({
                  bookID: b.bookID,
                  title: b.title,
                  price: b.price,
                  quantity: 1,
                })
              }
            >
              Add to Cart
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/purchase/${b.title}/${b.bookID}`)}
            >
              Purchase
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center gap-2 mb-3">
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
            className="btn btn-light"
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
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

      <div className="mb-3">
        <label>
          Results per page:{' '}
          <select
            className="form-select d-inline-block w-auto"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default BookList;
