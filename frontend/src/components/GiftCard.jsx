import React, { useState } from "react";
import { Link } from "react-router-dom";
import addToCart from "../pages/Cart";

function GiftCard({ gifts }) {
  const handleAddToCart = () => {
    if (gift) {
      addToCart(gift._id); //  addToCart function with gift ID
      console.log("Gift added to cart!");
    }
  };

  return (
    <div className="gift-cards-container">
      {gifts.map((gift) => (
        <div key={gift._id} className="gift-card">
          <div>
            <img
              src={gift.imageURL}
              alt={gift.name}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <h3>{gift.name}</h3>
            <p>{gift.description}</p>
            <p>{gift.price} $$$</p>
            <p>
              Location: {gift.location.city}, {gift.location.country}
            </p>
            <p>Category: {gift.category}</p>
            <p>Number of People: {gift.numberOfPeople}</p>
            <Link to={`/gifts/${gift._id}`}>
              <button>Details</button>
            </Link>

            <button onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GiftCard;
