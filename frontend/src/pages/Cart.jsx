// Cart page
import { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "../components/CartItem";

const API_URL = "http://localhost:5005";
const token = localStorage.getItem("authToken");
console.log(token);

function addToCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="cart">
      <h2>Your Gift Shopping Cart</h2>
      {setCartItems &&
        cartItems &&
        cartItems.map((item) => {
          return <CartItem key={item._id} item={item} />;
        })}
    </div>
  );
}

export default addToCart;
