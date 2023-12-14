import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

const GiftDetailsPage = () => {
  const { giftId } = useParams();
  const [gift, setGift] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AuthContext);

  console.log("ACTIVE USER =>", user);
  useEffect(() => {
    axios
      .get(`${API_URL}/gifts/${giftId}`)
      .then((response) => {
        setGift(response.data);
        console.log("gift details fetched", response.data);
      })
      .catch((error) => {
        console.error("error getting gift details", error);
      });

    // Check if gift is already in favorites
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav._id === giftId));
    console.log();
  }, [giftId, user]);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const isItemInCart = cartItems.some((item) => item.id === giftId);

    if (isItemInCart) {
      console.log("item is already in  cart.");
    } else {
      const newItem = {
        _id: giftId,
        name: gift.name,
        price: gift.price,
      };

      const updatedCart = [...cartItems, newItem];

      //save cart to localstorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      if (typeof props.updateCart === "function") {
        props.updateCart(updatedCart);
      }
      console.log("Item added to cart", newItem);
    }
  };

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isCurrentlyFavorite = favorites.some((fav) => fav._id === giftId);

    if (isCurrentlyFavorite) {
      // If already in favorites, remove it
      const updatedFavorites = favorites.filter((fav) => fav._id !== giftId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // If not in favorites, add it
      const updatedFavorites = [...favorites, gift];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <div>
      {gift ? (
        <div>
          <h2>{gift.name}</h2>
          <img
            src={gift.imageURL}
            alt={gift.name}
            style={{ maxWidth: "500", maxHeight: "420px" }}
          />
          <p>{gift.description}</p>
          <p>{gift.price}</p>
          <p>
            Location: {gift.location.city}, {gift.location.country}
          </p>
          <p>Category: {gift.category}</p>
          <p>Number of People: {gift.numberOfPeople}</p>
          <button onClick={handleAddToCart}>Add to cart</button>
          <button onClick={handleAddToFavorites}>
            {isFavorite ? "Remove from favs" : "Add to favs"}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GiftDetailsPage;
