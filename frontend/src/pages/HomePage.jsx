import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Gift from "backend/models/Gift.model";
import Navbar from "../components/Navbar";
import FilteringComponent from "../components/FilteringComp";

const API_URL = "http://localhost:5005";

const HomePage = () => {
  const [gifts, setGifts] = useState([]);
  const [filteredGifts, setFilteredGifts] = useState([]);

  useEffect(() => {
    // create a api call to the backend which is receiving all the gifts.json file from backend
    axios
      .get(`${API_URL}/gifts`)
      .then((response) => {
        const allGifts = response.data;
        setGifts(allGifts);
        setFilteredGifts(allGifts);
      })
      .catch((error) => console.error("Error fetching gifts", error));
  }, []);

  const handleFilterChange = (filters) => {
    let filteredResults = gifts;
    if (filters.category) {
      filteredResults = filteredResults.filter((gift) =>
        gift.category.includes(filter.category)
      );
    }
    setFilteredGifts(filteredResults);
  };

  return (
    <div>
      <Navbar />
      <h1>UnboxJoy</h1>
      <FilteringComponent onFilterChange={handleFilterChange} />
      <div>
        <h2>Choose joy for loved ones</h2>
        <ul>
          {gifts.map((gift) => (
            <li key={gift._id}>
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
