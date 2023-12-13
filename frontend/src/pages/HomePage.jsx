import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Gift from "backend/models/Gift.model";
import Navbar from "../components/Navbar";
import FilteringComponent from "../components/FilteringComp";
import GiftCard from "../components/GiftCard";

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
        console.log("------------", allGifts);
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
      <h1>UnboxJoy</h1>
      <div>
        <h2>Choose joy for loved ones</h2>
      </div>
      <GiftCard gifts={gifts} />
    </div>
  );
};

export default HomePage;
