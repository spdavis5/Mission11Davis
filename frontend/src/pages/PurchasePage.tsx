import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Book } from '../types/Book';

/**
 * PurchasePage Component
 * Displays details for a specific book and allows adding it to the cart
 */
function PurchasePage() {
  const navigate = useNavigate();
  const { bookID } = useParams(); // Get the bookID from URL parameters
  const { addToCart } = useCart(); // Get cart functionality from context
  const [book, setBook] = useState<Book | null>(null); // Store the book details
  const [quantity, setQuantity] = useState(1); // Track quantity to add to cart

  // Fetch book details when component mounts or bookID changes
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://mission13davis-backend.azurewebsites.net/api/Book/GetBook?bookID=${bookID}`
          //https://localhost:5005/api/Book/GetBook?bookID=${bookID}
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookID]);

  /**
   * Add the specified quantity of books to cart and navigate to cart page
   */
  const handleAddToCart = () => {
    if (book) {
      // Add the book to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart({
          bookID: book.bookID,
          title: book.title,
          price: book.price,
        });
      }
      navigate('/cart'); // Redirect to cart page after adding
    }
  };

  // Don't render anything if book data isn't loaded yet
  if (!book) return null;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Book details section */}
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
        {/* Purchase options section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Purchase Details</h4>
              {/* Quantity selector */}
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
              {/* Action buttons */}
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
