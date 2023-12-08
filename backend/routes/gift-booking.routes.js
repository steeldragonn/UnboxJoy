const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Gift = require("../models/Gift.model");
const Booking = require("../models/Booking.model");

//Get booking for a specific gift
router.get("/:giftId/bookings", async (req, res) => {
  try {
    const { giftId } = req.params;

    //Find the gift by a specific Id
    const gift = await Gift.findById(giftId);

    if (!gift) {
      return res.status(404).json({ error: "Gift not found" });
    }

    //Find a booking for a specific gift
    const bookings = await Booking.find({ giftId });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching gift bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new booking for a gift
router.post("/", (req, res, next) => {
  const { name, numOfPeople, price, date, time } = req.body;

  const newBooking = new Booking({
    name,
    numOfPeople,
    price,
    date,
    time,
  });
});

module.exports = router;
