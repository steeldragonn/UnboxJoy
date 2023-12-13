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
        console.log("gift details fetched", response.data);
      })
      .catch((error) => {
        console.error("error getting gift details", error);
      });
  }, [giftId]);

  console.log("gift details", gift);

  const handleAddToCart = () => {
    console.log("gift added to cart");
  };

  const handleAddToFavorites = () => {
    console.log("gift added to favorites");
  };

  console.log("gift details", gift);

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
          <button onClick={handleAddToFavorites}>Add to favs</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GiftDetailsPage;
