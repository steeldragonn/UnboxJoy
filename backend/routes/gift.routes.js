const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const Gift = require("../models/Gift.model");

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

//

//gift details

//gifts search

//gift favorite

//gift cart

module.exports = router;
