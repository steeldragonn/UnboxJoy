import React, { useState } from "react";

const CartItem = ({ item, handleRemoveFromCart }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <li key={item._id}>
      <p>{item.name}</p>
      <p>{item.price}€ per person </p>

      <div>
        <button onClick={handleDecreaseQuantity}>-</button>
        <p>Quantity: {quantity}</p>
        <button onClick={handleIncreaseQuantity}>+</button>
      </div>

      <button onClick={() => handleRemoveFromCart(item._id)}>
        Remove from Cart
      </button>
    </li>
  );
};

export default CartItem;
