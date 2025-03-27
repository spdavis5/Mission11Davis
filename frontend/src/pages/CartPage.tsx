import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

/**
 * CartPage Component
 * Displays the user's shopping cart and handles cart operations
 */
function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  /**
   * Updates the quantity of a book in the cart
   * @param bookID - The ID of the book to update
   * @param newQuantity - The new quantity to set
   */
  const handleQuantityChange = (bookID: number, newQuantity: number) => {
    updateQuantity(bookID, newQuantity);
  };

  /**
   * Handles the checkout process
   * Currently shows an alert, clears the cart, and navigates back to books page
   */
  const handleCheckout = () => {
    alert('Checkout functionality to be implemented');
    clearCart();
    navigate('/books');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Shopping Cart</h2>

      {/* Display message if cart is empty */}
      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty</div>
      ) : (
        <div className="row">
          {/* Cart items table */}
          <div className="col-md-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through cart items to display each item */}
                {cart.map((item: CartItem) => (
                  <tr key={item.bookID}>
                    <td>{item.title}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        className="form-control form-control-sm"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.bookID,
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.bookID)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart summary sidebar */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <p>
                  Total Items:{' '}
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
                <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
                <button
                  className="btn btn-success w-100"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
                <button
                  className="btn btn-secondary w-100 mt-2"
                  onClick={() => navigate('/books')}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
