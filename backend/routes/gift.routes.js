const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const Gift = require("../models/Gift.model");

router.get("/gifts", (req, res) => {
  const {
    name,
    price,
    description,
    imageURL,
    location: { country, city },
    category,
    numberOfPeople,
  } = req.body;

  console.log(req.body);
  return;
});
