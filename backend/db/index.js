// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = "mongodb://127.0.0.1:27017/backend";
const Gift = require("../models/Gift.model");

const data = require("../data/gifts.json");

const dbConnection = mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    const dbName = x.connections[0].name;

    console.log(`Connected to Mongo! Database name: "${dbName}"`);
    return Gift.deleteMany();
  })
  .then(() => {
    return Gift.insertMany(data);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = dbConnection;
