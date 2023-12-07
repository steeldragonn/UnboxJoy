require("dotenv").config();
require("./db");
require("./config")(app);

const express = require("express");
const app = express();
const giftsData = require("./gifts.json");

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const giftRoutes = require("./routes/gift.routes");
require("./error-handling")(app);

module.exports = app;
