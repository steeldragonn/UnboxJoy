require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
const cors = require("cors");

require("./config")(app);

// //enabling cors for all routes
// app.use(cors({ origin: "http://localhost:5173" }));

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const giftRoutes = require("./routes/gift.routes");
app.use("/gifts", giftRoutes);

const giftBookingRoutes = require("./routes/gift-booking.routes");
app.use("/", giftBookingRoutes);

require("./error-handling")(app);

module.exports = app;
