import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Book } from '../types/Book';

function PurchasePage() {
  const navigate = useNavigate();
  const { bookID } = useParams();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:5005/api/Book/${bookID}`
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookID]);

  const handleAddToCart = () => {
    if (book) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          bookID: book.bookID,
          title: book.title,
          price: book.price,
        });
      }
      navigate('/cart');
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2>{book.title}</h2>
          <ul className="list-unstyled">
            <li>
              <strong>Author:</strong> {book.author}
            </li>
            <li>
              <strong>Publisher:</strong> {book.publisher}
            </li>
            <li>
              <strong>ISBN:</strong> {book.isbn}
            </li>
            <li>
              <strong>Category:</strong> {book.category}
            </li>
            <li>
              <strong>Price:</strong> ${book.price.toFixed(2)}
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Purchase Details</h4>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  Add {quantity} to Cart
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/books')}
                >
                  Back to Books
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
