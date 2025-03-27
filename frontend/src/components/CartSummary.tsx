import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/**
 * CartSummary Component
 * Displays a floating cart summary with item count and total price
 * Clicking on it navigates to the cart page
 */
const CartSummary = () => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Get cart utility functions from context
  const { getTotalItems, getTotalPrice } = useCart();

  return (
    <div
      className="position-fixed top-0 end-0 m-3 p-2 bg-light rounded shadow-sm"
      style={{
        zIndex: 1000,
        cursor: 'pointer',
      }}
      // Navigate to cart page when clicked
      onClick={() => navigate('/cart')}
    >
      {/* Display cart summary with item count and total price */}
      <div className="d-flex align-items-center">
        <span className="me-2">🛒</span>
        <span>
          {getTotalItems()} Items | ${getTotalPrice().toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartSummary;
