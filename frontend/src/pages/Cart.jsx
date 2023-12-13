// Cart page
import { useState, useEffect } from "react";
import axios from "axios";
// import giftsData from "../../../backend/data/gifts.json";
import CartItem from "../components/CartItem";

const API_URL = "http://localhost:5005";
const token = localStorage.getItem("authToken");
console.log(token);
function addToCart() {
  const [gifts, setGifts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setGifts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //   const addToCart = (gift) => {
  //     setCart((prevCart) => [...prevCart, product]);
  //   };

  const deleteGift = (giftId) => {
    const filteredGifts = gifts.filter((gift) => {
      return gift._id !== giftId;
    });
    setGifts(filteredGifts);
  };

  return (
    <div>
      <h2>Gift Cart Page</h2>
      {setGifts &&
        gifts &&
        gifts.map((gift, index) => {
          return (
            <CartItem key={index} gift={gift} clickToDelete={deleteGift} />
          );
        })}
    </div>
  );
}

export default addToCart;
