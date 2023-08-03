// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { readdirSync } = require("fs");
const app = express();
app.use(express.json());
app.use(cors());

// ROUTES => ReaddirSync, goes through folder routes, and maps all routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// DATABASE
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connection established"))
  .catch((err) => console.log("Error connecting to DB", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
