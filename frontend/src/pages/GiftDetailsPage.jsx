import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import addToCart from "./Cart";

const API_URL = "http://localhost:5005";

const GiftDetailsPage = () => {
  const { giftId } = useParams();
  const [gift, setGift] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/gifts/${giftId}`)
      .then((response) => {
        setGift(response.data);
      })
      .catch((error) => {
        console.error("error getting gift details", error);
      });
  }, [giftId]);

  const handleAddToCart = () => {
    if (gift) {
      addToCart(gift._id);
      console.log("gift added to cart");
    }
  };

  //const handleAddToFavorites here
  const handleAddToFavorites = async () => {
    try {
      const userId = "your_user_id_here";
      await axios.post(`${API_URL}/favorites/${giftId}`, { userId });
      console.log("Gift added to favorites!");
    } catch (error) {
      console.error("Error adding gift to favorites", error);
    }
  };

  return <div></div>;
};
