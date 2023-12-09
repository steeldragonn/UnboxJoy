require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
require("./config")(app);

// const giftsData = require("./gifts.json");

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const giftRoutes = require("./routes/gift.routes");
app.use("/gifts", giftRoutes);

require("./error-handling")(app);

module.exports = app;
