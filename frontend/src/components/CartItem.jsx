import React, { useState } from "react";

const CartItem = ({
  item,
  handleRemoveFromCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  quantity,
}) => {
  // const [quantity, setQuantity] = useState(item.quantity || 1);

  // const handleIncreaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const handleDecreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  return (
    <li key={item._id}>
      <p>{item.name}</p>
      <p>{item.price}€ per person </p>

      <div>
        <button onClick={() => handleDecreaseQuantity(item)}>-</button>
        <p>Quantity: {quantity || 1}</p>
        <button onClick={() => handleIncreaseQuantity(item)}>+</button>
      </div>

      <button onClick={() => handleRemoveFromCart(item._id)}>
        Remove from Cart
      </button>
    </li>
  );
};

export default CartItem;
