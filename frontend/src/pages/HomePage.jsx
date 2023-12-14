import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:5005";

const HomePage = () => {
  const [gifts, setGifts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  ///LETS TRY PLEASE WORKKKKK
  const [minPeople, setMinPeople] = useState("");
  const [maxPeople, setMaxPeople] = useState("");

  useEffect(() => {
    // create an API call to the backend to receive all the gifts.json file from the backend
    const params = {};

    axios
      .get(`${API_URL}/gifts`, { params })
      .then((response) => {
        setGifts(response.data);
        setFilteredArray(response.data);
      })
      .catch((error) => console.error("Error fetching gifts", error));
  }, []);

  useEffect(() => {
    if (selectedCategory || query) {
      setFilteredArray(handleFiltering());
    } else {
      setFilteredArray(gifts);
    }
  }, [query, selectedCategory, gifts]);

  const handleFiltering = () => {
    return gifts.filter((eachGift) => {
      const numberOfPeople = eachGift.numberOfPeople;
      const minNumberOfPeople = eachGift.minNumberOfPeople || 1;
      const maxNumberOfPeople = eachGift.maxNumberOfPeople;

      const isWithinNumberRange =
        (minPeople === "" || numberOfPeople >= Number(minPeople)) &&
        (maxPeople === "" || numberOfPeople <= Number(maxPeople)) &&
        numberOfPeople >= minNumberOfPeople &&
        (!maxNumberOfPeople || numberOfPeople <= maxNumberOfPeople);

      const isMatchingCategory =
        !selectedCategory || eachGift.category.includes(selectedCategory);

      return isWithinNumberRange && isMatchingCategory;
      // (!selectedCategory || eachGift.category.includes(selectedCategory)) &&
      // isWithingRange
    });
  };

  const handleAddToFavorites = (giftId) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isCurrentlyFavorite = favorites.some((fav) => fav._id === giftId);

    if (isCurrentlyFavorite) {
      // If already in favorites, remove it
      const updatedFavorites = favorites.filter((fav) => fav._id !== giftId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // If not in favorites, add it
      const selectedGift = gifts.find((gift) => gift._id === giftId);
      const updatedFavorites = [...favorites, selectedGift];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    // Force re-render by updating the state or any relevant state variable
    setGifts([...gifts]);
  };

  return (
    <div>
      <h1>UnboxJoy</h1>
      <div>
        <h2>Choose joy for loved ones</h2>
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="art">art</option>
            <option value="wellness">wellness </option>
            <option value="adrenaline">adrenaline </option>
            <option value="food">food</option>
            <option value="sport">sport</option>
            <option value="music">music</option>
          </select>
        </label>

        <label>
          Number of People:
          <div>
            <input
              type="number"
              placeholder="min"
              value={minPeople}
              onChange={(e) => setMinPeople(e.target.value)}
            />
            <input
              type="number"
              placeholder="max"
              value={maxPeople}
              onChange={(e) => setMaxPeople(e.target.value)}
            />
          </div>
        </label>

        <ul className="giftList">
          {filteredArray.map((gift) => (
            <li key={gift._id} className="giftItem">
              <div>
                <img
                  src={gift.imageURL}
                  alt={gift.name}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <h3>{gift.name}</h3>
                <p>{gift.description}</p>
                <p>Price p.P. : {gift.price}€</p>
                <p>
                  location: {gift.location.city}, {gift.location.country}
                </p>
                <p>category: {gift.category}</p>
                <p>Number of People: {gift.numberOfPeople}</p>
                <Link to={`/gifts/${gift._id}`}>Details</Link>
                <button onClick={() => handleAddToFavorites(gift._id)}>
                  {JSON.parse(localStorage.getItem("favorites"))?.some(
                    (fav) => fav._id === gift._id
                  )
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
