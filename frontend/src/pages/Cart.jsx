import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleRemoveFromCart = (itemId) => {
    // Remove the item from the cart
    const updatedCart = cartItems.filter((item) => item._id !== itemId);

    // Update the local storage and state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((curr, item) => curr + item.price, 0);
  return (
    <div>
      <h2>Gift Cart Page</h2>
      <div>
        <p>{totalItems}</p>
        <p>{totalPrice}</p>
      </div>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <li key={item._id}>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <button onClick={() => handleRemoveFromCart(item._id)}>
                Remove from Cart
              </button>
            </li>
          ))}
        </div>
      ) : (
        <p>Cart empty</p>
      )}
    </div>
  );
};

export default Cart;
