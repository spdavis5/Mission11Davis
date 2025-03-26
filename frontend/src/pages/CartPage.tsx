import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.projectId}>
                {item.projectName}: ${item.donationAmount}
                <button onClick={() => removeFromCart(item.bookID)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: </h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
