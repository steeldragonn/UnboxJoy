import React, { useState } from "react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

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

  const totalPrice = cartItems.reduce(
    (curr, item) => curr + item.price * (item.quantity || 1),
    0
  );

  return (
    <div>
      <h2>Gift Cart Page</h2>
      <div></div>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))}
          <div>
            <p>Total: {totalPrice} €</p>
            <Link to="/checkout">
              <button id="checkout-button">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Cart empty</p>
      )}
    </div>
  );
};

export default Cart;
