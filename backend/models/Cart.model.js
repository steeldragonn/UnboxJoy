//Cart Model
const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    numOfPeople: { type: Number, required: true },
    price: { type: Number },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Booking", cartSchema);

module.exports = Cart;
