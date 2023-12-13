import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
const API_URL = "http://localhost:5005";

const HomePage = () => {
  const [gifts, setGifts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    // create a api call to the backend which is receiving all the gifts.json file from backend
    const params = {};

    axios
      .get(`${API_URL}/gifts`, { params })
      .then((response) => {
        setGifts(response.data);
        setFilteredArray(response.data);
        console.log(response);
      })
      .catch((error) => console.error("Error fetching gifts", error));
  }, []);

  useEffect(() => {
    if (selectedCategory && query) {
      setFilteredArray(handleFiltering());
    } else {
      setFilteredArray(gifts);
    }
  }, [query, selectedCategory, gifts]);
  console.log(
    "THIS IS WHAT I AM SEARCHING FOR WITH CATEGORY  =>",
    selectedCategory
  );
  console.log(
    "THIS IS WHAT I AM SEARCHING FOR WITH NUMBER OF PEOPLE =>",
    query
  );

  const handleFiltering = () => {
    return gifts.filter((eachGift) => {
      return (
        (selectedCategory === "" ||
          eachGift.category.includes(selectedCategory)) &&
        eachGift.numberOfPeople === query
      );
    });
  };

  return (
    <div>
      <Navbar />
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
            <option value="indoor">indoor</option>
            <option value="outdoor">outdoor</option>
            <option value="food">food</option>
            <option value="trip">trip</option>
            <option value="sport">sport</option>
            <option value="music">music</option>
          </select>
        </label>

        <label>
          Number of People:
          <input
            type="number"
            value={query}
            onChange={(e) => setQuery(Number(e.target.value))}
          />
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
                <p>price: ${gift.price}</p>
                <p>
                  location: {gift.location.city}, {gift.location.country}
                </p>
                <p>category: {gift.category}</p>
                <p>number of People: {gift.numberOfPeople}</p>
                <Link to={`/gifts/${gift._id}`}>Details</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
