const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const Gift = require("../models/Gift.model");
const User = require("../models/User.model");

//get all gifts
router.get("/", async (req, res) => {
  try {
    // Fetch gifts from MongoDB
    const allGifts = await Gift.find();
    console.log(allGifts);
    // Return the gifts as JSON
    res.json(allGifts);
  } catch (error) {
    // Handle errors, e.g., log them and send an error response
    console.error("Error fetching gifts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//gift details
router.get("/:giftId", (req, res, next) => {
  const { giftId } = req.params;

  Gift.findById(giftId)
    .then((gift) => res.status(200).json(gift))
    .catch((error) => res.json(error));
});

// POST request - adding a selected gift to favorites
router.post("/favorites/:giftId", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { giftId } = req.params;
    await User.findByIdAndUpdate(userId, {
      $push: { favorites: giftId },
    });
    res.status(200).json({ message: "gift added to favorites!" });
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/favorites", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userFavoriteGifts = await User.find().populate("favorites");
    res.status(200).json(userFavoriteGifts);
  } catch (error) {
    next(error);
  }
});

//gift cart

//route search by categoryYYYYYYYYYYYYYYYYYYY
router.get("/category/:giftCategory", (req, res) => {
  const { giftCategory } = req.params;
  console.log(giftCategory);
  Gift.find({ category: giftCategory })
    .then((gifts) => res.status(200).json(gifts))
    .catch((error) => res.json(error));
});

/// route search by numberOfPeople
router.get("/numberOfPeople/:numberOfPeople", (req, res) => {
  const { numberOfPeople } = req.params;
  console.log(numberOfPeople);
  Gift.find({ numberOfPeople: { $eq: numberOfPeople } })
    .then((gifts) => res.status(200).json(gifts))
    .catch((error) => res.json(error));
});

module.exports = router;
