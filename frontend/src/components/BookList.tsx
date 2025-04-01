import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchBooks } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortOrder,
          selectedCategories
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-danger text-center">{error}</div>;
  }

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
    <>
      <br />
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-center">
          <button className="btn btn-secondary" onClick={toggleSortOrder}>
            Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-center">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/adminBooks')}
          >
            ADMIN TOOLS
          </button>
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
                      onClick={() => navigate(`/purchase/${b.bookID}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1); // Reset to first page when page size changes
          }}
        />
      </div>
    </>
  );
}

export default BookList;
