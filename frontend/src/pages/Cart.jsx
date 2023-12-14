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

  const handleIncreaseQuantity = (item) => {
    console.log(item);
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const newItem = {
      _id: item._id,
      name: item.name,
      price: item.price,
    };

    const updatedCart = [...cartItems, newItem];
    // save cart to local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Item added to cart", newItem);
  };

  const handleDecreaseQuantity = (item) => {
    console.log(item);
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const allIds = cartItems.map((eachCartItem) => {
      return eachCartItem._id;
    });
    const lastIndex = allIds.lastIndexOf(item._id);
    console.log(lastIndex);
    cartItems.splice(lastIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce(
    (curr, item) => curr + item.price * (item.quantity || 1),
    0
  );

  console.log(totalPrice);

  return (
    <div>
      <h2>Gift Cart Page</h2>
      <div>
        <p>{totalItems}</p>
      </div>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />
          ))}
          <div>
            <p>Total: {totalPrice} €</p>
            <Link to="/checkout">
              <button>Proceed to Checkout</button>
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
