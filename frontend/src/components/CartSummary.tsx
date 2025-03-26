import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { getTotalItems, getTotalPrice } = useCart();

  return (
    <div
      className="position-fixed top-0 end-0 m-3 p-2 bg-light rounded shadow-sm"
      style={{
        zIndex: 1000,
        cursor: 'pointer',
      }}
      onClick={() => navigate('/cart')}
    >
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
