
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const emailSendRoute = require("./routes/emailsend");
const communicationRoute = require("./routes/communication");
const passportStrategy = require("./passport");
const mongoose = require("mongoose");
const session = require("express-session");

mongoose
  .connect(process.env.MONGO_URL, {
    // Remove useFindAndModify option
    // Other options
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));



const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/api/emailSend", emailSendRoute);
app.use("/fetch", communicationRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));