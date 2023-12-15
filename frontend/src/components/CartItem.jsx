import React, { useState } from "react";

const CartItem = ({ item, handleRemoveFromCart }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  return (
    <>
      <div className="cartitem">
        <div key={item._id}>
          <p className="cart-name">{item.name}</p>
          <p>{item.price}€ per person </p>

          <button onClick={() => handleRemoveFromCart(item._id)}>
            Remove from Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
