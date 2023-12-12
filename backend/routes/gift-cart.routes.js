//Gift Cart route
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Gift = require("../models/Gift.model.js");
const Cart = require("../models/Cart.model.js");

//Show gift item in the cart
router.get("/cart", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart && cart.gift.length > 0) {
      res.json(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Add new gift item to the cart
router.post("/cart/:giftId", async (req, res, next) => {
  const { userId } = req.params;
  const { giftId, name, quantity, price } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.directModifiedPaths.push({ name, quantity, price });
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        items: [{ name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
});

//Edit cart item of a specific gift
router.put("/cart/:id", async (req, res) => {
  const userId = req.params.id;
  const { giftId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    const item = await item.findOne({ _id: giftId });

    if (!item) return res.status(404).send("Item not found!");

    if (!cart) return res.status(400).send("Cart not found");
    else {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex((p) => p.giftId == giftId);

      // Check if product exists or not
      if (itemIndex == -1)
        return res.status(404).send("Item not found in cart!");
      else {
        let giftItem = cart.items[itemIndex];
        giftItem.quantity = quantity;
        cart.items[itemIndex] = giftItem;
      }
      cart.bill = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  } catch (err) {
    console.log("Error in update cart", err);
    res.status(500).send("Something went wrong");
  }
});

//Delete specific gift item from the cart
router.delete("/cart/:userId/:giftId", async (req, res) => {
  const userId = req.params.userId;
  const giftId = req.params.giftId;
  try {
    const cart = await Cart.findOne({ userId });
    const itemIndex = cart.items.findIndex((p) => p.giftId == giftId);
    if (itemIndex > -1) {
      const giftItem = cart.items[itemIndex];
      cart.bill -= giftItem.quantity * giftItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
