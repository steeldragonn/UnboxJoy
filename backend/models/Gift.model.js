const { Schema, model } = require("mongoose");

const giftSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  imageURL: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kunstkopie.de%2Fa%2Fgustav-klimt%2Fgustavklimt-damemitfcher.html&psig=AOvVaw1uq4DT6kgVOTSVUf28gQdx&ust=1702033894138000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLC9vtaR_oIDFQAAAAAdAAAAABAE",
  },
  location: {
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  //

  category: {
    type: String,
    enum: [
      "indoor",
      "outdoor",
      "art",
      "wellness",
      "food",
      "adrenaline",
      "trip",
      "sport",
      "music",
    ],
  },
  numberOfPeople: {
    type: Number,
  },
});

const Gift = model("Gift", giftSchema);
module.exports = Gift;
