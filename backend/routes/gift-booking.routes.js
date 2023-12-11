const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Gift = require("../models/Gift.model");
const Booking = require("../models/Booking.model");

//Show booking of a specific gift
router.get("/bookings/:giftId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.findOne({ userId });
    if (bookings && bookings.gift.length > 0) {
      res.json(bookings);
    } else {
      res.send(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Create booking of a specific gift
router.post("/bookings/:giftId", async (req, res, next) => {
  const { userId } = req.params;
  const { giftId, name, quantity, price } = req.body;

  try {
    const booking = await Booking.findOne({ userId });

    if (booking) {
      booking.directModifiedPaths.push({ name, quantity, price });
      booking.bill += quantity * price;
      booking = await booking.save();
      return res.status(201).send(booking);
    } else {
      const newBooking = await Booking.create({
        userId,
        items: [{ name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newBooking);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
});

//Edit booking of a specific gift
router.put("/bookings/:id", async (req, res) => {
  const userId = req.params.id;
  const { giftId, quantity } = req.body;

  try {
    const booking = await Booking.findOne({ userId });
    const item = await item.findOne({ _id: giftId });

    if (!item) return res.status(404).send("Item not found!");

    if (!booking) return res.status(400).send("Cart not found");
    else {
      // if cart exists for the user
      let itemIndex = booking.items.findIndex((p) => p.giftId == giftId);

      // Check if product exists or not
      if (itemIndex == -1)
        return res.status(404).send("Item not found in cart!");
      else {
        let giftItem = booking.items[itemIndex];
        giftItem.quantity = quantity;
        booking.items[itemIndex] = giftItem;
      }
      booking.bill = booking.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      booking = await booking.save();
      return res.status(201).send(booking);
    }
  } catch (err) {
    console.log("Error in update cart", err);
    res.status(500).send("Something went wrong");
  }
});

//Delete booking of a specific gift
router.delete("/bookings/:userId/:giftId", async (req, res) => {
  const userId = req.params.userId;
  const giftId = req.params.giftId;
  try {
    const booking = await Booking.findOne({ userId });
    const itemIndex = booking.items.findIndex((p) => p.giftId == giftId);
    if (itemIndex > -1) {
      const giftItem = booking.items[itemIndex];
      booking.bill -= giftItem.quantity * giftItem.price;
      booking.items.splice(itemIndex, 1);
    }
    booking = await booking.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
