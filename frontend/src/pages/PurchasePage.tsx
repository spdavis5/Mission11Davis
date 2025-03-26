import WelcomeBand from '../components/WelcomeBand';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function DonatePage() {
  const navigate = useNavigate();
  const { projectName, bookID } = useParams();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      projectName: projectName || 'No Project Found',
      donationAmount,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Donate to {projectName}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter donation amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(Number(e.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate('/books')}>Go Back</button>
    </>
  );
}
export default DonatePage;
