import React, { useEffect, useState } from "react";

const GiftFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFromFavorites = (idToRemove) => {
    const updatedFavorites = favorites.filter((fav) => fav._id !== idToRemove);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h2>Liked: {favorites.length}</h2>
      {favorites.length > 0 ? (
        <div className="favorites-item">
          {favorites.map((favorite) => (
            <div key={favorite._id}>
              <h3>{favorite.name}</h3>
              <p>{favorite.description}</p>
              <img
                src={favorite.imageURL}
                alt={favorite.name}
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
              <button onClick={() => handleRemoveFromFavorites(favorite._id)}>
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites yet</p>
      )}
    </div>
  );
};

export default GiftFavorites;
