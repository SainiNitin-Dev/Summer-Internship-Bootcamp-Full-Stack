import { useState } from 'react';

function CartQuantity() {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div>
      <h3>Cart Quantity: {quantity}</h3>
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default CartQuantity;