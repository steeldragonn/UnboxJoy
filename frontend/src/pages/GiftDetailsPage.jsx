import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

const GiftDetailsPage = () => {
  const { giftId } = useParams();
  const [gift, setGift] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

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
  }, [giftId]);

  const handleAddToCart = () => {
    console.log("gift added to cart");
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
            style={{ maxWidth: "300px", maxHeight: "300px" }}
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
